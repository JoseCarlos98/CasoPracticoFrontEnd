import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { SharedModule } from '../shared/shared.module';
import { ModalPokemonComponent } from './modal-pokemon/modal-pokemon.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListadoComponent,
    ModalPokemonComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class HomeModule { }
