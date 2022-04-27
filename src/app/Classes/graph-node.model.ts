import {Edge} from "./edge.model";

export class GraphNode {
  name: string
  edgeArrayList: Edge[]

  constructor(id: string) {
    this.name = id;
    this.edgeArrayList = []
  }

  addEdge(edge: Edge) {
    this.edgeArrayList.push(edge);
  }
}
