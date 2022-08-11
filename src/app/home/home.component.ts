import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Pokemon } from './interface/interfaces.interface';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @Input() editarPokemon : any ;

  subscripcion! : Subscription;

  buscador = new FormControl('');

  pokemones : Pokemon[] = [];
  busquedaPokemon : Pokemon[] = [];
  nuevoOEditar: boolean = false;

  constructor(
    private api : ApiService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.obtenerTodos();
    this.sincronizarTabla();
    this.busqueda();
  }

  busqueda(){
    this.buscador.valueChanges.pipe(debounceTime(500)).subscribe(termino => {
      this.busquedaPokemon = [];
      this.pokemones.forEach((poke:any) => {
        if (poke.name.toLowerCase() == termino.toLowerCase()) this.busquedaPokemon.push(poke)
      })
    })
  }

  obtenerTodos(){
    this.api.obtenerTodos().subscribe((pokemones:Pokemon[]) => this.pokemones = pokemones);
  }

  sincronizarTabla(){
    this.subscripcion = this.api.refresh$.subscribe( _ => this.obtenerTodos());
  }
  
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }
}
