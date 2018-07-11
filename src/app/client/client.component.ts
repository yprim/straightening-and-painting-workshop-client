import { Component, OnInit } from '@angular/core';
import { LogicService } from '../services/logic.service';
import { Client } from '../models/client.model';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-client',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
	public clients: Array<Client>;
	public clientIdentification: string;
    public name: string;
    public lastname: string;
    public telephone: string;
	public address: string;
	public clientIdentificationEdit: string;
    public nameEdit: string;
    public lastnameEdit: string;
    public telephoneEdit: string;
	public addressEdit: string;
	public error: boolean;
	public errorMessage: string;

	constructor(private logicService: LogicService) { }

	ngOnInit() {
		this.loadClients();
	}

	loadEdit(client: Client){
		this.clientIdentificationEdit = client.clientIdentification;
		this.nameEdit = client.name;
		this.lastnameEdit = client.lastname;
		this.telephoneEdit = client.telephone;
		this.addressEdit = client.address;
	}

	deleteClient(client: Client){
		//pedir confirmacion
		this.logicService.deleteClient(client);
		this.loadClients();
	}

	editClient(){
		if(this.isEmpty(this.clientIdentificationEdit) || this.isEmpty(this.nameEdit) || this.isEmpty(this.lastnameEdit) || this.isEmpty(this.telephoneEdit) || this.isEmpty(this.addressEdit)){
			this.errorMessage = 'Debe ingresar todos los datos';
			this.error = true;
		}else{
			this.error = false;

			const client: Client = new Client(this.clientIdentificationEdit, this.nameEdit, this.lastnameEdit, this.telephoneEdit, this.addressEdit);
			
			this.logicService.updateClient(client).subscribe(data => {
				Swal('Actualizado', 'El cliente ha sido actualizado', 'success');
				this.loadClients();
			});
		}
	}

	loadClients(){
		this.logicService.getClients().subscribe(data => {
			this.clients = data;
		});
	}

	getClients(): Client[] {
		return this.clients;
	}

	addClient(){
		if(this.isEmpty(this.clientIdentification) || this.isEmpty(this.name) || this.isEmpty(this.lastname) || this.isEmpty(this.telephone) || this.isEmpty(this.address)){
			this.errorMessage = 'Debe ingresar todos los datos';
			this.error = true;
		}else{
			this.error = false;

			const client: Client = new Client(this.clientIdentification, this.name, this.lastname, this.telephone, this.address);
			this.logicService.addClient(client).subscribe(data => {
				Swal('Agregado', 'El cliente ha sido agregado', 'success');
				this.loadClients();
			});
		}
	}

	isEmpty(prop): boolean {
		return (
			prop === null ||
			prop === undefined ||
			(prop.hasOwnProperty('length') && prop.length === 0) ||
			(prop.constructor === Object && Object.keys(prop).length === 0)
		);
	}
}
