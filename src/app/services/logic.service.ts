import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Client } from "../models/client.model";
import { User } from "../models/user.model";
import { Vehicle } from "../models/vehicle.model";
import { WorkOrder } from "../models/workOrder.model";

@Injectable()
export class LogicService {
	private url = 'http://localhost:62750/api/';
	private headers;

	constructor(private http: Http) {
		this.headers = new Headers();
		this.headers.append('Access-Control-Allow-Headers', '*');
		this.headers.append('Access-Control-Allow-Methods', '*');
		this.headers.append('Access-Control-Allow-Origin', '*');
	}

	//////////////////////////////////// CLIENTS
	getClients(): Observable<Client[]> {
		return this.http.get(this.url + "client/", { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	addClient(client: Client): Observable<Client> {
		return this.http.post(this.url + "client/", client, { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	updateClient(client: Client): Observable<Client> {
		return this.http.put(this.url + "client/" + client.clientIdentification, client, { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	deleteClient(client: Client) {
		console.log('TODO borrar');
		console.log(client);
	}

	//////////////////////////////////// USERS
	login(user: User): Observable<User> {
		return this.http.post(this.url + "user/login/", user, { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	register(user: User): Observable<User>{
		return this.http.post(this.url + "user/", user, { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	setLogIn(user: User): void {
		window.localStorage.setItem('login', JSON.stringify(user));
	}

	isLoggedIn(): boolean {
		return window.localStorage.getItem('login') ? true : false;
	}

	getLoggedInUser(): string {
		return JSON.parse(window.localStorage.getItem('login'));
	}

	logout(): void {
		window.localStorage.removeItem("login");
	}

	//////////////////////////////////// VEHICLES
	getVehicles(): Observable<Vehicle[]> {
		return this.http.get(this.url + "vehicle/", { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	addVehicle(vehicle: Vehicle): Observable<Client> {
		return this.http.post(this.url + "vehicle/", vehicle, { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	updateVehicle(vehicle: Vehicle): Observable<Client> {
		return this.http.put(this.url + "vehicle/" + vehicle.licenseNumber, vehicle, { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	deleteVehicle(vehicle: Vehicle) {
		console.log('TODO borrar');
		console.log(vehicle);
	}

	//////////////////////////////////// ORDERS
	getWorkOrders(licenseNumber: string): Observable<WorkOrder[]> {
		return this.http.get(this.url + "workOrder/" + licenseNumber, { headers: this.headers })
			.pipe(map(response => response.json()))
	}
	
	addWorkOrder(workOrder: WorkOrder): Observable<WorkOrder> {
		return this.http.post(this.url + "workOrder/", workOrder, { headers: this.headers })
			.pipe(map(response => response.json()))
	}

	editWorkOrder(workOrder: WorkOrder): Observable<WorkOrder> {
		return this.http.put(this.url + "workOrder/" + workOrder.workOrderId, workOrder, { headers: this.headers })
			.pipe(map(response => response.json()))
	}
}