import { Injectable } from '@angular/core';
import { GraphNode } from '../Models/graph-node.model';
import { Edge } from '../Models/edge.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}

  nodesAdjacencyList: GraphNode[] = [];

  inputNode: string;
  outputNode: string;
  updateNodes(inputNode, outputNode) {
    this.inputNode = inputNode;
    this.outputNode = outputNode;
  }

  gain: number = null;
  updateGain(value: number) {this.gain = value;}

  addNode(id: number) {
    this.nodesAdjacencyList.push(new GraphNode(id.toString()));
  }

  addEdge(fromNodeId: number, toNodeId: number) {
    let edge = new Edge(this.gain, toNodeId.toString());
    this.nodesAdjacencyList[fromNodeId - 1].addEdge(edge);
  }


  backendUrl = 'http://localhost:8080';

  sendAdjacencyList() {
    return this.http.post(
      `${this.backendUrl}/initialize/${this.inputNode}/${this.outputNode}`,
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

  getNonTouchingLoops() {
    return this.http.get(`${this.backendUrl}/mason/ntloops`)
  }
}
