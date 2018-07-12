import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.css']
})
export class ExitComponent implements OnInit {

  constructor(private logicService: LogicService, private router: Router) {
    if (this.logicService.isLoggedIn()) {
      this.logicService.logout();
    }

    this.router.navigate(['/entrar']);
  }

  ngOnInit() {
  }

}
