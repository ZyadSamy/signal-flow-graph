import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  resultPage = false;

  branches = [];
  nodes = [];

  addingBranchIsActive: boolean = false;
  selectedNodeId = null;

  addNode() {
    const n = this.nodes.length + 1;
    this.nodes.push({
      id: `${n}`,
      label: `${n}`,
    });
    this.nodes = [...this.nodes];
    console.log(this.nodes);
  }

  addBranch() {
    // toggle
    this.addingBranchIsActive = !this.addingBranchIsActive;
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
}
