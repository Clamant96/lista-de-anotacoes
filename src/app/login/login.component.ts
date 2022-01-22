import { UsuarioService } from './../service/usuario.service';
import { UsuarioLogin } from './../models/UsuarioLogin';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  /* ARMAZENA O TOKEN DO USUARIO */
  tokenUsuario: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

  }

  /* LOGA O USUARIO NA SESSAO */
  logar() {
    this.usuarioService.login(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp;

      alert('Login realizado com sucesso!');

      environment.token = this.usuarioLogin.token;
      environment.username = this.usuarioLogin.username;
      environment.senha = this.usuarioLogin.senha;
      environment.id = this.usuarioLogin.id;

      /* ARMAZENA O TOKEN DO USUARIO NA VARIAVEL */
      this.tokenUsuario = this.usuarioLogin.token;

      /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
      localStorage.setItem('token', this.tokenUsuario);

      console.log("ID: "+ environment.id);
      console.log("Token: "+ environment.token);
      console.log("Usuario: "+ environment.username);
      console.log("Senha: "+ environment.senha);

      this.router.navigate(['/home']);

    })

  }

}
