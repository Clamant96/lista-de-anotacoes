import { environment } from './../../environments/environment.prod';
import { Lista } from './../models/Lista';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public url = environment.endereco + environment.porta;

  constructor(
    private http: HttpClient

  ) { }

  getByIdLista(id: number): Observable<Lista> {

    return this.http.get<Lista>(`${this.url}/lista/${id}`);
  }

  portLista(lista: Lista): Observable<Lista> {

    return this.http.post<Lista>(`${this.url}/lista`, lista);
  }

  putLista(lista: Lista): Observable<Lista> {

    return this.http.put<Lista>(`${this.url}/lista`, lista);
  }

  deleteLista(id: number) {

    return this.http.delete(`${this.url}/lista/${id}`);
  }

}
