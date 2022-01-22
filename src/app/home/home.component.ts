import { Categoria } from './../models/Categoria';
import { CategoriaService } from './../service/categoria.service';
import { environment } from './../../environments/environment.prod';
import { ListaService } from './../service/lista.service';
import { Lista } from './../models/Lista';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lista: Lista = new Lista();

  public categoria: Categoria = new Categoria();
  public categoriaArray: Categoria[];

  public arrayMemoria: Categoria[];

  public arrayTexto: string;

  constructor(
    private router: Router,
    private listaService: ListaService,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.getAllCategorias();
  }

  findByIdListaCategoria(id: number) {
    console.log(`ID CLICADO: ${id}`);

    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;

    }, erro => {
      console.log(erro);
    });
  }

  getAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {

      resp.map(item => {
        if(item.usuario.id == environment.id) {
          this.arrayMemoria.push(item);
          console.log(item);
        }
      });

      console.log(this.arrayMemoria);

      //arrayMemoria = arrayMemoria.splice(1, 1);

      //console.log(arrayMemoria);

      this.categoriaArray = this.arrayMemoria; // REMOVE O NOME PRODUTO DO ARRAY ANTES DE CARREGAR NO PRODUTO NOVAMENTE

    });

  }

  putListaUsuario() {
    this.listaService.putLista(this.lista).subscribe((resp: Lista) => {
      this.lista = resp;

      alert('LISTA ATUALIZADA COM SUCESSO');

    });
  }

}
