import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Pokemon, Respuesta } from '../interface/interfaces.interface';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {

  onDestroy = new Subject<void>();

  @Input()  pokemones : any 
  @Input()  pokemonSeleccionado : any 
  @Output() editarPokemon = new EventEmitter()

  constructor(
    private api : ApiService
  ) { }

  ngOnInit(): void { }

  modificarPokemon(poke:Pokemon){
    this.pokemonSeleccionado = poke;
    this.editarPokemon.emit(this.pokemonSeleccionado)
  }

  borrarPokemon(poke:any){
    Swal.fire({
      title: `Estas seguro de eliminar "${poke.name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => { 
      if (result.isConfirmed) {
        this.api.borrar(poke.id).pipe(takeUntil(this.onDestroy)).subscribe((respuesta:Respuesta) => {
          if (respuesta.success) Swal.fire(`"${poke.name}" eliminado!`);
            else  Swal.fire(`Error: ${respuesta}`);
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}