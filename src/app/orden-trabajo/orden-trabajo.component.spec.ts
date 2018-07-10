import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTrabajoComponent } from './orden-trabajo.component';
import { Router } from '@angular/router';
describe('OrdenTrabajoComponent', () => {
  let component: OrdenTrabajoComponent;
  let fixture: ComponentFixture<OrdenTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
