import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor() { }

  totalDelta = "312"
  overallTransferFunction = "1200"

  forwardPaths = [
    {
      path: "1-2-3-4",
      gain: "12",
      delta: "1"
    },
    {
      path: "1-2-4",
      gain: "6",
      delta: "5"
    },
    {
      path: "1-3-4",
      gain: "10",
      delta: "2"
    }
  ]

  loops = [
    [
      {
        paths: "1-2-1",
        gain: "9"
      },
      {
        paths: "2-3-2",
        gain: "5"
      },
      {
        paths: "3-4-3",
        gain: "7"
      },
      {
        paths: "1-2-3-1",
        gain: "10"
      }
    ],
    [
      {
        paths: "1-2-1, 3-4-3",
        gain: "63"
      },
      {
        paths: "3-4-3, 2-3-2",
        gain: "35"
      }
    ],
    [
      {
        paths: "1-2-1, 2-3-2, 3-4-3",
        gain: "315"
      },
      {
        paths: "2-3-2, 3-4-3, 1-2-3-1",
        gain: "125"
      }
    ],
    [
      {
        paths: "1-2-1, 2-3-2, 3-4-3, 1-2-3-1",
        gain: "341"
      }
    ]
   
  ]

  ngOnInit(): void {
  }

  refresh(){
    window.location.reload()
  }
  

}
