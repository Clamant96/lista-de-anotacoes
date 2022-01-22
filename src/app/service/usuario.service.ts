import { UsuarioLogin } from './../models/UsuarioLogin';
import { environment } from './../../environments/environment.prod';
import { Usuario } from './../models/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = environment.endereco + environment.porta;

  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient

  ) { }

  public cadastro(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.url}/usuario/cadastro`, usuario, this.autorizacao);
  }

  public login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {

    return this.http.post<UsuarioLogin>(`${this.url}/usuario/login`, usuarioLogin, this.autorizacao);
  }

}
