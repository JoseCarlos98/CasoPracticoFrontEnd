import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComponent } from './listado.component';


describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  describe('Debe contenedor un pokemon', () => {
    it( 'Debe de retornar true', () => {

        const res = component.modificarPokemon;

        expect( res ).toBeTruthy();

    });
  });

});
