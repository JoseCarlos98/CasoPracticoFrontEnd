import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api.service';
import { ModalPokemonComponent } from './modal-pokemon.component';
import { EMPTY, from, Observable, of } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('InfoPokemonComponent', () => {
  let component: ModalPokemonComponent;
  let fixture: ComponentFixture<ModalPokemonComponent>;
  const http = jasmine.createSpyObj('HttpClient', { get: of({}) });
  const api = new ApiService(http);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it( 'Debe de crear un formulario con 7 campos, name, image, attack, defense, hp, type y idAuthor', () => {

    expect( component.form.contains('name') ).toBeTruthy();
    expect( component.form.contains('image') ).toBeTruthy();
    expect( component.form.contains('attack') ).toBeTruthy();
    expect( component.form.contains('defense') ).toBeTruthy();
    expect( component.form.contains('hp') ).toBeTruthy();
    expect( component.form.contains('type') ).toBeTruthy();
    expect( component.form.contains('idAuthor') ).toBeTruthy();

  });

  it( 'El name debe de ser obligatorio', () => {
    const control = component.form.get('name');
    control?.setValue('');
    expect( control?.valid ).toBeFalsy();
  });
  
  it( 'El image debe de ser obligatorio', () => {
    const control = component.form.get('image');
    control?.setValue('');
    expect( control?.valid ).toBeFalsy();
  });
  
  it( 'El attack debe de ser obligatorio', () => {
    const control = component.form.get('attack');
    control?.setValue('');
    expect( control?.valid ).toBeFalsy();
  });
  
  it( 'El defense debe de ser obligatorio', () => {
    const control = component.form.get('defense');
    control?.setValue('');
    expect( control?.valid ).toBeFalsy();
  });
  
  it( 'El hp debe de ser obligatorio', () => {
    const control = component.form.get('hp');
    control?.setValue('');
    expect( control?.valid ).toBeFalsy();
  });
  
  it( 'El type debe de ser obligatorio', () => {
    const control = component.form.get('type');
    control?.setValue('');
    expect( control?.valid ).toBeFalsy();
  });
  it( 'El idAuthor debe de ser obligatorio', () => {
    const control = component.form.get('idAuthor');
    control?.setValue('');
    expect( control?.valid ).toBeFalsy();
  });


  it( 'Debe de llamar al servidor para agregar un pokemon', () => {

    const espia = spyOn( api, 'registro' ).and.callFake( poke => {
        return of();
    });

    component.registarOEditarPokemon();

    expect( espia ).toHaveBeenCalled();

  });

  
  it( 'Debe de agregar un nuevo pokemon al arreglo de pokemones', () => {

    const pokemon = 
    {
      id: 2546,
      name: "Snorlax",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png",
      attack: 70,
      defense: 53,
      hp: 1,
      type: "Base",
      id_author: 1
  }

    spyOn( api, 'registro' ).and.returnValue(  from( [  pokemon  ] )   );

   component.registarOEditarPokemon();
});
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
