import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Pokemon } from '../interface/interfaces.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-modal-pokemon',
  templateUrl: './modal-pokemon.component.html',
  styleUrls: ['./modal-pokemon.component.scss']
})
export class ModalPokemonComponent implements OnInit, OnChanges, OnDestroy {

  onDestroy = new Subject<void>();

  @Input() editarPokemon! : any;
  @Output() cancel = new EventEmitter();

  form = this.fb.group({
    name    : new FormControl( null,  Validators.required),
    image  : new FormControl( null, Validators.required),
    attack  : new FormControl( null, Validators.required),
    defense : new FormControl( null, Validators.required),
    hp       : new FormControl( null, Validators.required),
    type     : new FormControl( null, Validators.required),
    idAuthor : new FormControl(1, Validators.required)
  });

  constructor(
    private fb  : FormBuilder,
    private api : ApiService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
      const { currentValue } = changes.editarPokemon;
      if (currentValue) this.form.patchValue(this.editarPokemon);
  }

  registarOEditarPokemon(){
    if (this.form.status == 'INVALID') Swal.fire('Error en el formulario, verifique los campos...');
      else {
        if (this.editarPokemon) {
          this.api.editar(this.form.value, this.editarPokemon.id).pipe(takeUntil(this.onDestroy)).subscribe((poke:Pokemon) => {
            if (poke.id) {
              this.resetear();
              Swal.fire('Pokemon editado con exito!');

            } else Swal.fire('Hubo un error, hable con el administrador...');
          })

        } else {
          this.api.registro(this.form.value).pipe(takeUntil(this.onDestroy)).subscribe((poke:Pokemon) => {
            if (poke.id) {
              this.resetear();
              Swal.fire('Pokemon creado con exito!');
              
            } else Swal.fire('Hubo un error, hable con el administrador...');
          })
        }
    }
  }

  resetear(){
    this.form.reset();
    this.editarPokemon = null;
    this.cancel.emit(null);
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
