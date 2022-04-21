import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  resultPage = false;

  branches = [];
  nodes = [];

  addingBranchIsActive: boolean = false;
  gain: number = null;
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
    // adjust graph zoom to fit all nodes after adding the new one
    this.zoomToFit$.next(true)
  }

  addBranch() {
      // toggle
      this.addingBranchIsActive = !this.addingBranchIsActive;
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

  getResult(){
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
