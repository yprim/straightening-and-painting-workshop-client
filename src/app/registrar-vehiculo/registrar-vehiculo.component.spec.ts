import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVehiculoComponent } from './registrar-vehiculo.component';

describe('RegistrarVehiculoComponent', () => {
  let component: RegistrarVehiculoComponent;
  let fixture: ComponentFixture<RegistrarVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
