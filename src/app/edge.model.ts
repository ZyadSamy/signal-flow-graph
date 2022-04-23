import {GraphNode} from "./graph-node.model";

export class Edge {
  private _gain: Number
  private _toNode: GraphNode


  constructor(gain: Number, toNode: GraphNode) {
    this._gain = gain;
    this._toNode = toNode;
  }


  get gain(): Number {
    return this._gain;
  }

  set gain(value: Number) {
    this._gain = value;
  }

  get toNode(): GraphNode{
    return this._toNode;
  }

  set toNode(value: GraphNode) {
    this._toNode = value;
  }
}
