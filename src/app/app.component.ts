import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private graphService: GraphService) {}

  resultPage = false;

  branches = [];
  nodes = [];

  addingBranchIsActive: boolean = false;
  gain: number = null;
  inputNode: string = null
  outputNode: string = null
  selectedNodeId = null;

  // this is used only to adjust the graph fitment
  zoomToFit$: Subject<boolean> = new Subject();

  addNode() {
    const n = this.nodes.length + 1;
    this.nodes.push({
      id: `${n}`,
      label: `${n}`,
    });
    this.nodes = [...this.nodes];
    this.graphService.addNode(n);
    // adjust graph zoom to fit all nodes after adding the new one
    this.zoomToFit$.next(true)
  }

  addBranch() {
      this.addingBranchIsActive = true;
  }

  resetAddingBranch() {
    this.addingBranchIsActive = false;
    this.selectedNodeId = null;
  }

  branchBtnDisabled() : boolean {
    // this is used to evalue if the add branch button should be disabled or not
    // possible bug where the user could press the button and then remove the gain
    return this.gain == null
  }

  onNodeClick(node) {
    if (this.addingBranchIsActive) {
      // check if the source node (from node) was selected
      if (this.selectedNodeId) {
        // add new branch into the graph
        this.branches.push({
          id: `B${this.branches.length}`,
          source: this.selectedNodeId,
          label: this.gain,
          target: node.id,
        });
        this.graphService.addEdge(this.selectedNodeId, node.id, this.gain)
        // this is needed to trigger the graph update
        this.branches = [...this.branches];
        // reset
        this.addingBranchIsActive = false;
        this.selectedNodeId = null;
      } else {
        this.selectedNodeId = node.id;
      }
    }
  }

  totalDelta;
  overallTransferFunction;
  forwardPaths;
  loops;
  
  getResult(){
    this.graphService.sendAdjacencyList(this.inputNode, this.outputNode).subscribe(response => {
      this.graphService.getPaths().subscribe( paths => this.forwardPaths = paths )
      this.graphService.getTransferFunction().subscribe( tf => this.overallTransferFunction = tf)
      this.graphService.getOverallDelta().subscribe(d =>this.totalDelta = d)
      this.graphService.getLoops().subscribe( loops => this.loops = loops)
    });
    this.resultPage = true;
  }


  clearGraph() {
    this.nodes = [];
    this.branches = [];
    // reset this just in case
    this.addingBranchIsActive = false;
    this.selectedNodeId = null;
  }
}
