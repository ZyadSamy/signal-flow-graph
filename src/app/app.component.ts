import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GraphService } from './Services/graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private graphService: GraphService) {}

  branches = [];
  nodes = [];
  // this is needed for adding a branch
  addingBranchIsActive: boolean = false;
  selectedNodeId = null;
  // this is used only to adjust the graph fitment
  zoomToFit$: Subject<boolean> = new Subject();
  // this is used to load result component when solve button is pressed
  resultPage = false;

  addNode() {
    const n = this.nodes.length + 1;
    this.nodes.push({
      id: `${n}`,
      label: `${n}`,
    });
    this.nodes = [...this.nodes];
    this.graphService.addNode(n);
    // adjust graph zoom to fit all nodes after adding the new one
    this.zoomToFit$.next(true);
  }

  addBranch() {
    this.addingBranchIsActive = true;
  }

  onNodeClick(node) {
    if (this.addingBranchIsActive) {
      // check if the source node (from node) was selected
      if (this.selectedNodeId) {
        // add new branch into the graph
        this.branches.push({
          id: `B${this.branches.length}`,
          source: this.selectedNodeId,
          label: this.graphService.gain,
          target: node.id,
        });
        this.graphService.addEdge(this.selectedNodeId, node.id);
        // this is needed to trigger the graph update
        this.branches = [...this.branches];
        // reset
        this.addingBranchIsActive = false;
        this.selectedNodeId = null;
      } 
      else {this.selectedNodeId = node.id;}
    }
  }

  resetAddingBranch() {
    this.addingBranchIsActive = false;
    this.selectedNodeId = null;
  }

  solve() {
    // init results components
    this.resultPage = true;
  }

  // clearGraph() {
  //   this.nodes = [];
  //   this.branches = [];
  //   // reset this just in case
  //   this.addingBranchIsActive = false;
  //   this.selectedNodeId = null;
  // }
}
