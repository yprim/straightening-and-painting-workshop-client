import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	public email: string;
	public name: string;
	public password: string;
	public repeat: string;
	public errorMessage: string;
	public error: boolean;

	constructor() { }

	ngOnInit() {
	}

	register() {
		if (this.isEmpty(this.email) || this.isEmpty(this.name) || this.isEmpty(this.password) || this.isEmpty(this.repeat)) {
			this.errorMessage = 'Debe ingresar todos los datos';
			this.error = true;
		}else if (this.password !== this.repeat) {
			this.errorMessage = 'Las contraseñas deben coincidir';
			this.error = true;
		}else{
			this.error = false;
			
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
