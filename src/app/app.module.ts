import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LogicService } from './services/logic.service';
import { ClientListComponent } from './client-list/client-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
	{ path: 'cliente', component: ClientListComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'registrar', component: RegisterComponent },
	{ path: 'entrar', component: LoginComponent },
	{ path: '', component: HomeComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		ClientListComponent,
		PageNotFoundComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes),
		HttpClientModule,
		HttpModule,
		FormsModule
	],
	providers: [LogicService],
	bootstrap: [AppComponent]
})
export class AppModule { }
