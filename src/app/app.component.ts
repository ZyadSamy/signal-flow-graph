import { Component } from '@angular/core';
import { Subject } from 'rxjs';

// gain
// adjust

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  branches = [];
  nodes = [];

  zoomToFit$: Subject<boolean> = new Subject();

  addingBranchIsActive: boolean = false;
  gain: number = null;
  selectedNodeId = null;

  addNode() {
    const n = this.nodes.length + 1;
    this.nodes.push({
      id: `${n}`,
      label: `${n}`,
    });
    this.nodes = [...this.nodes];
    this.zoomToFit$.next(true)
    console.log(this.nodes);
  }

  addBranch() {
    // toggle
    if (this.gain == null) alert('Enter gain first');
    else{
      this.addingBranchIsActive = !this.addingBranchIsActive;
    }
  }

  branchBtnDisabled() : boolean {
    // this is used to evalue if the add branch button should be disabled or not
    // possible bug where the user could press the button and then remove the gain
    return this.gain == null
  }

  onNodeSelect(node) {
    if (this.addingBranchIsActive) {
      // console.log('Node selected: ', nodeSelected);
      // console.log('Branch from', this.addingBranch.from);
      console.log('Branches', this.branches);

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

  clearGraph() {
    this.nodes = [];
    this.branches = [];
    // reset this just in case
    this.addingBranchIsActive = false;
    this.selectedNodeId = null;
  }
}
