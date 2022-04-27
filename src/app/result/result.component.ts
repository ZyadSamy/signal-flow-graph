import { Component, OnInit, Input } from '@angular/core';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private graphService: GraphService) { }

  @Input('d') totalDelta;
  @Input('tf') overallTransferFunction;
  @Input('fp') forwardPaths;
  @Input('l') loops;
  @Input('ntl') nonTouchingLoops;

  ngOnInit(): void {
  }

  refresh(){
    window.location.reload()
  }

}
