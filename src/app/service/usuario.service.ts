import { UsuarioLogin } from './../models/UsuarioLogin';
import { environment } from './../../environments/environment.prod';
import { Usuario } from './../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = environment.endereco + environment.porta;

  constructor(
    private http: HttpClient

  ) { }

  public cadastro(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.url}/usuario/cadastro`, usuario);
  }

  public login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {

    return this.http.post<UsuarioLogin>(`${this.url}/usuario/login`, usuarioLogin);
  }

}
