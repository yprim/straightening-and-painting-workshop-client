import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../models/workOrder.model';
import { LogicService } from '../services/logic.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-work-order',
	templateUrl: './work-order.component.html',
	styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
	public orders: Array<WorkOrder>;
	public workOrderEdit: WorkOrder;
	public licenseNumbers: Array<string>;
	public clientIdentifications: Array<string>;
	public isLicense: boolean;
	public showAddButton: boolean;
	public errorMessage: string;
	public errorMessageAdd: string;
	public errorMessageEdit: string;
	public description: string;
	public tentativeDate: Date;
	public clientIdentification: string;
	public licenseNumber: string;
	public error: boolean;
    public descriptionEdit: string;
    public tentativeDateEdit: Date;
    public laborPriceEdit: number;

	constructor(private logicService: LogicService) {
		this.orders = new Array<WorkOrder>();
	}

	ngOnInit() {
		this.getVehicles();
	}

	public myDatePickerOptions: IMyDpOptions = {
		dateFormat: 'yyyy-mm-dd',
		dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mier', th: 'Juev', fr: 'Vier', sa: 'Sab' },
		monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ag', 9: 'Set', 10: 'Oct', 11: 'Nov', 12: 'Dic' }
	};

	onDateChanged(event: IMyDateModel) {
		this.tentativeDate = new Date(event.date.year, event.date.month, event.date.day);
	}

	onDateChangedEdit(event: IMyDateModel) {
		this.tentativeDateEdit = new Date(event.date.year, event.date.month, event.date.day);
	}

	getVehicles() {
		this.logicService.getVehicles().subscribe(data => {
			this.licenseNumbers = data.map(vehicle => vehicle.licenseNumber);
		});
	}

	getLicenseNumbers() {
		return this.licenseNumbers;
	}

	onChangeLicense(e) {
		this.licenseNumber = e.target.value;

		if (this.licenseNumber !== 'null') {
			this.showAddButton = true;
			this.logicService.getWorkOrders(this.licenseNumber).subscribe(data => {
				this.orders = data;
				if (this.orders.length !== 0) {
					this.isLicense = true;
					this.errorMessage = '';
				} else {
					this.isLicense = false;
					this.errorMessage = 'No existen ordenes para la placa seleccionada';
				}
			});
		} else {
			this.errorMessage = '';
			this.isLicense = false;
			this.showAddButton = false;
		}
	}

	fillIdentifications() {
		this.logicService.getClients().subscribe(data => {
			this.clientIdentifications = data.map(client => client.clientIdentification);
		});
	}

	getOrders() {
		return this.orders;
	}

	getClientIdentifications() {
		return this.clientIdentifications;
	}

	onChangeIdentification(e) {
		this.clientIdentification = e.target.value;
	}

	addOrder() {
		if (this.isEmpty(this.description) || this.isEmpty(this.tentativeDate) || this.isEmpty(this.clientIdentification) || this.clientIdentification === 'null') {
			this.error = true;
			this.errorMessageAdd = 'Debe ingresar todos los datos';
		} else {
			this.error = false;
			this.errorMessageAdd = '';

			const workOrder: WorkOrder = new WorkOrder(0, this.description, this.tentativeDate, 0, 0, this.clientIdentification, this.licenseNumber);

			this.logicService.addWorkOrder(workOrder).subscribe(data => {
				Swal('Agregado', 'La orden ha sido agregada', 'success');

				this.logicService.getWorkOrders(this.licenseNumber).subscribe(data => {
					this.orders = data;
				});
			});
		}
	}

	editOrder(){
		if (this.isEmpty(this.descriptionEdit) || this.isEmpty(this.tentativeDateEdit) || this.isEmpty(this.laborPriceEdit)) {
			this.error = true;
			this.errorMessageEdit = 'Debe ingresar todos los datos';
		} else {
			this.error = false;
			this.errorMessageEdit = '';

			this.workOrderEdit.description = this.descriptionEdit;
			this.workOrderEdit.tentativeDate = this.tentativeDateEdit;
			this.workOrderEdit.laborPrice = this.laborPriceEdit;

			this.logicService.editWorkOrder(this.workOrderEdit).subscribe(data => {
				Swal('Listo', 'La orden ha sido editada', 'success');

				this.logicService.getWorkOrders(this.licenseNumber).subscribe(data => {
					this.orders = data;
				});
			});
		}
	}

	loadEdit(order: WorkOrder){
		this.workOrderEdit = order;
		this.descriptionEdit = order.description;
		this.tentativeDateEdit = order.tentativeDate;
		this.laborPriceEdit = order.laborPrice;
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
