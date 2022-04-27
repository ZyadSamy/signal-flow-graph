import { Injectable } from '@angular/core';
import { GraphNode } from './Classes/graph-node.model';
import { Edge } from './Classes/edge.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}

  nodesAdjacencyList: GraphNode[] = [];

  addNode(id: number) {
    console.log(id.toString());
    this.nodesAdjacencyList.push(new GraphNode(id.toString()));
    // this.http
    //   .post(`${this.backendUrl}/add/node`, id.toString())
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }

  addEdge(fromNodeId: number, toNodeId: number, gain: number) {
    // console.log(this.nodesAdjacencyList)
    // console.log(toNodeId)
    let edge = new Edge(gain, toNodeId.toString());
    // this.http
    //   .post(`${this.backendUrl}/add/edge`, edge, {
    //     params: {
    //       fromNodeName: fromNodeId.toString(),
    //     },
    //   })
    //   .subscribe();
    this.nodesAdjacencyList[fromNodeId - 1].addEdge(edge);
  }

  backendUrl = 'http://localhost:8080';

  sendAdjacencyList(inputNode: string, outputNode: string) {
    // console.log(this.nodesAdjacencyList);
    // console.log(
    //   this.nodesAdjacencyList[0].edgeArrayList[0].toNode ===
    //     this.nodesAdjacencyList[1]
    // );
    return this.http.post(
      `${this.backendUrl}/initialize/${inputNode}/${outputNode}`,
      this.nodesAdjacencyList
    );
  }

  getTransferFunction() {
    return this.http.get(`${this.backendUrl}/mason/tf`);
  }

  getPaths() {
    return this.http.get(`${this.backendUrl}/mason/paths`);
  }

  getLoops() {
    return this.http.get(`${this.backendUrl}/mason/loops`);
  }

  getOverallDelta() {
    return this.http.get(`${this.backendUrl}/mason/overallDelta`)
  }
}
