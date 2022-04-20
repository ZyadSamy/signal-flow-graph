import { Component, OnInit } from '@angular/core';
import * as Dracula from 'graphdracula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {

    // intial template to make sure the library works

    var Graph = Dracula.Graph
    var Renderer = Dracula.Renderer.Raphael
    var Layout = Dracula.Layout.Spring

    var graph = new Graph()

    graph.addEdge('Node1', 'Node2', { label: 'G1', directed: true, stroke: '#c9c9c9'});
    graph.addEdge('Node2', 'Node3', { label: 'G2', directed: true, stroke: '#c9c9c9'});

    var layout = new Layout(graph)
    var renderer = new Renderer('#paper', graph, 400, 150)
    renderer.draw()
  }
}
