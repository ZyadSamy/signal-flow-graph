import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent{
  @Input('nodes') nodes;
  @Input('branches') branches;
  @Input('zoomToFit$') zoomToFit$;
  @Input('selectedNodeId') selectedNodeId;
  @Output() onNodeClick = new EventEmitter();

  emitSelection(e) {
    this.onNodeClick.emit(e);
  }
}
