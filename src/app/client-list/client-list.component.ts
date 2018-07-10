import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { Client } from '../models/client.model';

@Component({
	selector: 'app-client-list',
	templateUrl: './client-list.component.html',
	styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
	public clients: Array<Client>;

	constructor(private logicService: LogicService) { }

	ngOnInit() {
		this.logicService.getClients().subscribe(data => {
			this.clients = data;
		});
	}

	getClients(): Client[] {
		return this.clients;
	}

}
