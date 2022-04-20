import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signal-flow-graph';

  Edges = [
    
  ]

  Nodes = [
    
  ]

  addNode(){
    this.Nodes.push({id: (this.Nodes.length + 1).toString(), label:(this.Nodes.length + 1).toString()});
    this.Nodes = [...this.Nodes];
    console.log(this.Nodes);
  }
}
