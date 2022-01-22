import { environment } from './../../environments/environment.prod';
import { Lista } from './../models/Lista';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public url = environment.endereco + environment.porta;

  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient

  ) { }

  getByIdLista(id: number): Observable<Lista> {

    return this.http.get<Lista>(`${this.url}/lista/${id}`, this.autorizacao);
  }

  portLista(lista: Lista): Observable<Lista> {

    return this.http.post<Lista>(`${this.url}/lista`, lista, this.autorizacao);
  }

  putLista(lista: Lista): Observable<Lista> {

    return this.http.put<Lista>(`${this.url}/lista`, lista, this.autorizacao);
  }

  deleteLista(id: number) {

    return this.http.delete(`${this.url}/lista/${id}`, this.autorizacao);
  }

}
