import {Edge} from "./edge.model";

export class GraphNode {
  private _id: number
  private _edgesList: Array<Edge>


  constructor(id: number) {
    this._id = id;
    this.edgesList = new Array<Edge>()
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get edgesList(): Array<Edge> {
    return this._edgesList;
  }

  set edgesList(value: Array<Edge>) {
    this._edgesList = value;
  }
}
