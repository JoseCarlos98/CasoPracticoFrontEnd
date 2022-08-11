import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Pokemon, Respuesta } from '../home/interface/interfaces.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBase = environment.baseUrl;

  refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh(){
    return this.refresh$;
  }

  registro(body: object) {
    const url = `${this.apiBase}?idAuthor=1`;
    
    return this.http.post<Pokemon>(url, body).pipe(
      tap( data => data ?  this.refresh$.next() : null),
    );
  }

  obtenerTodos() {
    const url = `${this.apiBase}?idAuthor=1`;

    return this.http.get<Pokemon[]>(url)
  }

  editar(body?: object, id?: any) {
    const url = `${this.apiBase}${id}`;

    return this.http.put<Pokemon>(url, body).pipe(
      tap( data => data ?  this.refresh$.next() : null),
      catchError(err =>  of(err.statusText))
    );
  }

  borrar(id: string) {
    const url = `${this.apiBase}${id}`;

    return this.http.delete<Respuesta>(url).pipe(
      tap( data => data ?  this.refresh$.next() : null),
      catchError(err =>  of(err.statusText))
    );
  }
}
