import { Injectable } from '@angular/core';
import {GraphNode} from "./graph-node.model";
import {Edge} from "./edge.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  nodesAdjacencyList: Array<GraphNode>;
  inputNode: string
  outputNode: string

  constructor(private http: HttpClient) { }

  addNode(id: number) {
    this.nodesAdjacencyList.push(new GraphNode(id))
  }

  addEdge(fromNodeId: number, toNodeId: number, gain: number) {
    let toNodeReference = this.nodesAdjacencyList[toNodeId];
    this.nodesAdjacencyList[fromNodeId].edgesList.push(new Edge(gain, toNodeReference))
  }

  backendUrl = "http://localhost:8080/"

  sendAdjacencyList() {
      return this.http.post(this.backendUrl, this.nodesAdjacencyList)
  }



}
