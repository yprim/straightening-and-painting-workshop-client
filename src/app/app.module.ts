import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LogicService } from './services/logic.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { WorkOrderComponent } from './work-order/work-order.component';

import { MyDatePickerModule } from 'mydatepicker';
import { ExitComponent } from './exit/exit.component';

const appRoutes: Routes = [
	{ path: 'order', component: WorkOrderComponent },
	{ path: 'salir', component: ExitComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'vehicle', component: VehicleComponent },
	{ path: 'registrar', component: RegisterComponent },
	{ path: 'client', component: ClientComponent },
	{ path: 'entrar', component: LoginComponent },
	{ path: '', component: HomeComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		DashboardComponent,
		ClientComponent,
		VehicleComponent,
		WorkOrderComponent,
		ExitComponent

	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes),
		HttpClientModule,
		HttpModule,
		FormsModule,
		NgxPaginationModule,
		MyDatePickerModule
	],
	providers: [LogicService],
	bootstrap: [AppComponent]
})
export class AppModule { }
