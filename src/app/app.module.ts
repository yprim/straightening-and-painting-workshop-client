import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes/reportes.component';

const appRoutes: Routes =[
{ path: 'actualizar-cliente', component: ActualizarClienteComponent },
{ path: 'orden-trabajo', component: OrdenTrabajoComponent },
{ path: 'registrar-cliente', component: RegistrarClienteComponent },
{ path: 'registrar-vehiculo', component: RegistrarVehiculoComponent },
{ path: 'reportes', component: ReportesComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    RegistrarClienteComponent,
    ActualizarClienteComponent,
    OrdenTrabajoComponent,
    RegistrarVehiculoComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
		HttpClientModule,
		HttpModule,
		FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
