import { Component, OnInit, Input } from '@angular/core';
import { GraphService } from '../../Services/graph.service';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  overallDelta;
  overallTransferFunction;
  forwardPaths;
  feedbackLoops;
  nonTouchingLoops;

  ngOnInit(): void {
    this.sendRequests();
  }

  sendRequests() {
    this.graphService.sendAdjacencyList().subscribe(() => {
      this.graphService
        .getPaths()
        .subscribe((paths) => (this.forwardPaths = paths));
      this.graphService
        .getTransferFunction()
        .subscribe((tf) => (this.overallTransferFunction = tf));
      this.graphService
        .getOverallDelta()
        .subscribe((delta) => (this.overallDelta = delta));
      this.graphService
        .getLoops()
        .subscribe((loops) => (this.feedbackLoops = loops));
      this.graphService.getNonTouchingLoops().subscribe((nonTouchingLoops) => {
        this.nonTouchingLoops = nonTouchingLoops;
        console.log(nonTouchingLoops);
      });
    });
  }

  refreshWindow() {
    window.location.reload();
  }
}
