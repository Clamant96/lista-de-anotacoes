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

  portLista(lista: Lista): Observable<Lista> {

    return this.http.post<Lista>(`${this.url}/endereco`, lista);
  }

  putLista(lista: Lista): Observable<Lista> {

    return this.http.put<Lista>(`${this.url}/endereco`, lista);
  }

  deleteLista(id: number) {

    return this.http.delete(`${this.url}/endereco/${id}`);
  }

}
