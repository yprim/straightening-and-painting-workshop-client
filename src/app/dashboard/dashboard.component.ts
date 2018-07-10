import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public completeName: string;

  constructor(private logic: LogicService) { }

  ngOnInit() {
    this.completeName = this.logic.getLoggedInUser()['completeName'];
  }

}
