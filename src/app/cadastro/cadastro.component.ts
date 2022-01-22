import { Usuario } from './../models/Usuario';
import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public confirmaSenha: string;

  public avatar: string = '../../assets/img/avata_1.png';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

  }

  confirmarSenha(event:any){
    this.confirmaSenha= event.target.value;

  }

  selecaoAvatar(event: any) {
    this.avatar = event.target.value;
  }

  /* CADASTRA UM NOVO USUARIO NA BASE DE DADOS */
  cadastrar(){

    if(this.usuario.senha != this.confirmaSenha){
      alert("A senha estão incorretas!")

    }else{
      this.usuarioService.cadastro(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;

        alert('Usuário cadastrado com sucesso!');

        this.router.navigate(['/login']);

      })
    }
  }

}
