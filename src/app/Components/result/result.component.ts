import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { GraphService } from '../../Services/graph.service';
import structuredClone from '@ungap/structured-clone';

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
        let ntClone = structuredClone(this.nonTouchingLoops)
        console.log(ntClone);
        let i = 0;
        console.log("Non Touching Loops Length: " + this.nonTouchingLoops.length.toString())
        while(i < this.nonTouchingLoops.length ){
          if(this.nonTouchingLoops[i].length == 0){
            break;
          }
          i++;
          console.log(i)
        }
        if(i == this.nonTouchingLoops.length){
          //Do Nothing
        }
        else{
          this.nonTouchingLoops.splice(i);
        }
        
        console.log(this.nonTouchingLoops)

        // this.nonTouchingLoops.forEach(element => {
        //   if(element.length == 0){
        //     console.log("array no:" + this.nonTouchingLoops.indexOf(element).toString() + " has length 0")
        //     this.nonTouchingLoops.splice(this.nonTouchingLoops.indexOf(element), 1)
        //     console.log("array no:" + this.nonTouchingLoops.indexOf(element).toString() + " should have been removed" )
        //   }
        // console.log(nonTouchingLoops);
        // });
      });
    });
  }

  refreshWindow() {
    window.location.reload();
  }
}
