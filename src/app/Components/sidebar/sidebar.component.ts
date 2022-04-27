import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GraphService } from 'src/app/Services/graph.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Input() addingBranchIsActive: boolean;
  @Input() selectedNodeId = null;

  @Output('onAddNodeClick') addNodeEmitter = new EventEmitter();
  @Output('onAddBranchClick') addBranchEmitter = new EventEmitter();
  @Output('onSolveClick') solveEmitter = new EventEmitter();
  @Output('onCancel') cancelAddingBranchEmitter = new EventEmitter();

  inputNode: string;
  outputNode: string;
  branchButtonDisabled = true;

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {}

  addNode()   { this.addNodeEmitter.emit(null);   }
  addBranch() { this.addBranchEmitter.emit(null); }
  cancel()    { this.cancelAddingBranchEmitter.emit(null); }

  solve() {
    this.graphService.updateNodes(this.inputNode, this.outputNode);
    this.solveEmitter.emit();
  }

  onGainChange(e) { 
    const newGainValue = e.target.value;
    if(newGainValue != null) this.branchButtonDisabled = false;
    this.graphService.updateGain(newGainValue);
  }
}
