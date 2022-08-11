import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiService } from 'src/app/services/api.service';
import { Observable, of, from } from 'rxjs';
// import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { HomeComponent } from './home.component';
import { Pokemon } from './interface/interfaces.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const spy = jasmine.createSpyObj('spyClient', { get: of({}) });
  const api = new ApiService(spy);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it( 'Debe de llamar al servidor para traer los pokemones', () => {

    const espia = spyOn( api, 'obtenerTodos' ).and.callFake( () => {
        return of();
    });

    component.obtenerTodos();

    expect( espia ).toHaveBeenCalled();

});
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
