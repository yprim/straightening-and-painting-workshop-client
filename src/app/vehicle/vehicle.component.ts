import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { LogicService } from '../services/logic.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-vehicle',
	templateUrl: './vehicle.component.html',
	styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
	public vehicles: Array<Vehicle>;
	public licenseNumber: string;
	public color: string;
	public brand: string;
	public style: string;
	public year: number;
	public capacity: number;
	public weight: number;
	public chassis_number: string;
	public licenseNumberEdit: string;
	public colorEdit: string;
	public brandEdit: string;
	public styleEdit: string;
	public yearEdit: number;
	public capacityEdit: number;
	public weightEdit: number;
	public chassis_numberEdit: string;
	public error: boolean;
	public errorMessage: string;

	constructor(private logicService: LogicService) { }

	ngOnInit() {
		this.loadVehicles();
	}

	loadEdit(vehicle: Vehicle) {
		this.licenseNumberEdit = vehicle.licenseNumber;
		this.colorEdit = vehicle.color;
		this.brandEdit = vehicle.brand;
		this.styleEdit = vehicle.style;
		this.yearEdit = vehicle.year;
		this.capacityEdit = vehicle.capacity;
		this.weightEdit = vehicle.weight;
		this.chassis_numberEdit = vehicle.chassis_number;
	}

	deleteVehicle(vehicle: Vehicle){
		//pedir confirmacion
		this.logicService.deleteVehicle(vehicle);
		this.loadVehicles();
	}

	editVehicle(){
		if(this.isEmpty(this.licenseNumberEdit) || this.isEmpty(this.colorEdit) || this.isEmpty(this.brandEdit) || this.isEmpty(this.styleEdit) || this.isEmpty(this.yearEdit) || this.isEmpty(this.capacityEdit) || this.isEmpty(this.weightEdit) || this.isEmpty(this.chassis_numberEdit)){
			this.errorMessage = 'Debe ingresar todos los datos';
			this.error = true;
		}else{
			this.error = false;

			const vehicle: Vehicle = new Vehicle(this.licenseNumberEdit, this.colorEdit, this.brandEdit, this.styleEdit, this.yearEdit, this.capacityEdit, this.weightEdit, this.chassis_numberEdit);
			
			this.logicService.updateVehicle(vehicle).subscribe(data => {
				Swal('Actualizado', 'El vehículo ha sido actualizado', 'success');
				this.loadVehicles();
			});
		}
	}

	loadVehicles() {
		this.logicService.getVehicles().subscribe(data => {
			this.vehicles = data;
		});
	}

	getVehicles() {
		return this.vehicles;
	}

	addVehicle(){
		if(this.isEmpty(this.licenseNumber) || this.isEmpty(this.color) || this.isEmpty(this.brand) || this.isEmpty(this.style) || this.isEmpty(this.year) || this.isEmpty(this.capacity) || this.isEmpty(this.weight) || this.isEmpty(this.chassis_number)){
			this.errorMessage = 'Debe ingresar todos los datos';
			this.error = true;
		}else{
			this.error = false;

			const vehicle: Vehicle = new Vehicle(this.licenseNumber, this.color, this.brand, this.style, this.year, this.capacity, this.weight, this.chassis_number);
			
			this.logicService.addVehicle(vehicle).subscribe(data => {
				Swal('Agregado', 'El vehículo ha sido agregado', 'success');
				this.loadVehicles();
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
