import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LogicService } from '../services/logic.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public email: string;
	public password: string;
	public error: boolean;
	public errorMessage: string;

	constructor(private logic: LogicService, private router: Router) { }

	ngOnInit() {
	}

	login() {
		if (this.isEmpty(this.email) || this.isEmpty(this.password)) {
			this.errorMessage = 'Debe ingresar todos los datos';
			this.error = true;
		} else {
			const user: User = new User(this.email, '', this.password, 0);

			this.logic.login(user).subscribe(data => {
				if (data) {
					this.error = false;
					this.logic.setLogIn(data);
					this.router.navigate(['/dashboard']);
				} else {
					this.errorMessage = 'El usuario o contraseña ingresados son incorrectos';
					this.error = true;
				}
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
