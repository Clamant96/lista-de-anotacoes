import { Categoria } from './../models/Categoria';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public url = environment.endereco + environment.porta;

  constructor(
    private http: HttpClient

  ) { }

  getAllCategoria(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.url}/categoria`);
  }

  getByIdCategoria(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.url}/categoria/${id}`);
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(`${this.url}/categoria`, categoria);
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.put<Categoria>(`${this.url}/categoria`, categoria);
  }

  deleteCategoria(id: number) {

    return this.http.delete(`${this.url}/categoria/${id}`);
  }

}
