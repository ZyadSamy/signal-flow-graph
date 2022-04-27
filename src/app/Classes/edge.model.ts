export class Edge {
  gain: Number;
  toNode: string;

  constructor(gain: Number, toNode: string) {
    this.gain = gain;
    this.toNode = toNode;
  }
}
