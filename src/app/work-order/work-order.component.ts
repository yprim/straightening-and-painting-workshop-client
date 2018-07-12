import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WorkOrder } from '../models/workOrder.model';
import { LogicService } from '../services/logic.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import Swal from 'sweetalert2';
import { WorkDetail } from '../models/workDetail.model';
import { RequiredProduct } from '../models/requiredProduct.model';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
	selector: 'app-work-order',
	templateUrl: './work-order.component.html',
	styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
	public orders: Array<WorkOrder>;
	public products: Array<RequiredProduct>;
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
	public addMaterial: string;
	public addQuantity: string;
	public addPrice: string;
	public errorMessageProduct: string;
	public workOrderIdProducts: string;

	constructor(private logicService: LogicService, private router: Router) {
		if (!this.logicService.isLoggedIn()) {
			this.router.navigate(['/entrar']);
		}

		this.orders = new Array<WorkOrder>();
		this.products = new Array<RequiredProduct>();
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
					if (this.orders.length !== 0) {
						this.isLicense = true;
						this.errorMessage = '';
					} else {
						this.isLicense = false;
						this.errorMessage = 'No existen ordenes para la placa seleccionada';
					}
				});
			});
		}
	}

	editOrder() {
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

	loadEdit(order: WorkOrder) {
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

	loadProducts(order: WorkOrder) {
		this.products = [];
		this.workOrderIdProducts = order.workOrderId.toString();
		this.logicService.getWorkDetails(this.workOrderIdProducts).subscribe(data => {
			data.map(detail => {
				detail.products.map(product => {
					this.products.push(product);
				});
			});
		});
	}

	getProducts() {
		return this.products;
	}

	addProduct() {
		if (this.isEmpty(this.addMaterial) || this.isEmpty(this.addQuantity) || this.isEmpty(this.addPrice)) {
			this.error = true;
			this.errorMessageProduct = 'Debe ingresar todos los datos';
		} else {
			this.error = false;
			this.errorMessageProduct = '';

			const requiredProducts: Array<RequiredProduct> = new Array<RequiredProduct>();
			const product: RequiredProduct = new RequiredProduct(0, this.addMaterial, Number(this.addQuantity), Number(this.addPrice), 0);
			requiredProducts.push(product);

			const workDetail: WorkDetail = new WorkDetail(0, 0, '', Number(this.workOrderIdProducts), requiredProducts);

			this.logicService.addWorkDetail(workDetail).subscribe(data => {
				Swal('Listo', 'Se ha agregado', 'success');
				this.addMaterial = '';
				this.addQuantity = '';
				this.addPrice = '';

				this.products = [];
				this.logicService.getWorkDetails(this.workOrderIdProducts).subscribe(data => {
					data.map(detail => {
						detail.products.map(product => {
							this.products.push(product);
						});
					});
				});

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
			});
		}
	}

	@ViewChild('content') content: ElementRef;
	downloadPDF() {
		let doc = new jsPDF();

		let specialElementHandlers = {
			'#editor': function (element, renderer) {
				return true;
			}
		};

		let content = this.content.nativeElement;

		doc.text(20, 20, 'Taller de Enderezado y Pintura');
		doc.text(20, 30, 'Cedula jurídica: 01-2345-6789');
		doc.text(20, 40, 'Telefono: 86238284 - 258389482');

		const date = new Date();
		doc.text(20, 50, 'Fecha: ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());

		doc.fromHTML(content.innerHTML, 15, 50, {
			'width': 190,
			'elementHandlers': specialElementHandlers
		});

		doc.save('Orden de trabajo.pdf');
	}
}
