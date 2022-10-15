import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3'



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {



  list:any=""
  isOpen = false;
  constructor() {
    this.list= [ "Dashboard with similarity charts.","Similarity check on boot-up.","Student registration.", "Add courses and upload Assignments", "Submission view of all compared assigments.", "Emailing assignments." ]

   }

  ngOnInit(): void {

  }




}

