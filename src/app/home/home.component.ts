import { Usuario } from './../models/Usuario';
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
  public novaCategoria: Categoria = new Categoria();
  public categoriaArray: Categoria[];

  public novaLista: Lista = new Lista();
  public editaLista: Lista = new Lista();

  public carregaListaParaEdicao: Lista = new Lista();
  public editaListaPUT: Lista = new Lista();

  public carregaCategoriaParaEdicao: Categoria = new Categoria();
  public editaCategoriaPUT: Categoria = new Categoria();

  public usuario: Usuario = new Usuario();

  public arrayTexto: string;

  public username = environment.username;
  public avatar = environment.avatar;
  public id = environment.id;

  public atualizacao: boolean = false;
  public travaMenu: boolean = false;

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
    if(screen.width <= 600 && !this.travaMenu) {
      window.document.querySelector('.menu-responsivo')?.setAttribute('style', 'margin-left: -100%;');
      this.travaMenu = !this.travaMenu;

    }

    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;

    });

  }

  getAllCategorias() {
    let arrayMemoria = [new Categoria()];

    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {

      resp.map(item => {
        if(item.usuario.id == environment.id) {
          arrayMemoria.push(item);
        }
      });

    });

    arrayMemoria = arrayMemoria.splice(1, 1); // REMOVE O ITEM CATEGORIA DE DENTRO DO ARRAY

    this.categoriaArray = arrayMemoria; // REMOVE O NOME PRODUTO DO ARRAY ANTES DE CARREGAR NO PRODUTO NOVAMENTE

  }

  putListaUsuario() {
    this.listaService.putLista(this.lista).subscribe((resp: Lista) => {
      this.lista = resp;

      alert('LISTA ATUALIZADA COM SUCESSO');

    });
  }

  adicionarCategoria() {
    this.usuario.id = this.id;
    this.novaCategoria.usuario = this.usuario;

    this.categoriaService.postCategoria(this.novaCategoria).subscribe((resp: Categoria) => {
      this.categoriaService.getByIdCategoria(resp.id).subscribe((resp: Categoria) => {
        this.categoriaArray.push(resp);

      });

    });

    this.novaCategoria = new Categoria();

  }

  adicionarItemLista() {
    this.novaLista.categoria = this.categoria;
    this.novaLista.ativo = false;

    this.listaService.portLista(this.novaLista).subscribe((resp: Lista) => {
      this.categoria.lista.push(resp);
    });

    this.novaLista = new Lista();

    this.categoriaArray = this.categoriaArray.map(item => {
      if(item.id == this.categoria.id) {
        item = this.categoria;

        console.log('ITEM ATUALIZADO: ');
        console.log(item);
      }
      return item;
    });

    console.log('ARRAY CATEGORIA: ');
    console.log(this.categoriaArray);

  }

  alterarStatusItemLista(lista: Lista) {
    this.editaLista.categoria = this.categoria;
    this.editaLista.ativo = !lista.ativo;
    this.editaLista.id = lista.id;
    this.editaLista.texto = lista.texto;

    this.listaService.putLista(this.editaLista).subscribe((resp: Lista) => {
      console.log(resp);
    });

    setTimeout(() => {
      this.findByIdListaCategoria(this.editaLista.categoria.id);

      this.editaLista = new Lista();

    }, 100);

  }

  carregaItemLista(id: number) {
    this.listaService.getByIdLista(id).subscribe((resp: Lista) => {
      this.carregaListaParaEdicao = resp;
    });

  }

  atualizaLista() {
    console.log(this.carregaListaParaEdicao);

    this.listaService.putLista(this.carregaListaParaEdicao).subscribe((resp: Lista) => {
      console.log(resp);
    });

    setTimeout(() => {
      this.findByIdListaCategoria(this.carregaListaParaEdicao.categoria.id);

      this.carregaListaParaEdicao = new Lista();

    }, 100);

  }

  carregaCategoriaPorId(id: number) {
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.carregaCategoriaParaEdicao = resp;
    });

  }

  atualizaCategoria() {
    this.categoriaService.putCategoria(this.carregaCategoriaParaEdicao).subscribe((resp: Categoria) => {
      console.log(resp);
    });

    setTimeout(() => {
      this.getAllCategorias();

    }, 100);

  }

  excluirLista(id: number) {
    this.listaService.deleteLista(id).subscribe(resp => {
      console.log(resp);
    });

    setTimeout(() => {
      this.findByIdListaCategoria(this.categoria.id);

    }, 100);

  }

  excluirCategoria(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe(resp => {
      console.log(resp);
    });

    setTimeout(() => {
      this.getAllCategorias();

    }, 100);

  }

  responsividadeMenu() {
    if(screen.width <= 600 && !this.travaMenu) {
      window.document.querySelector('.menu-responsivo')?.setAttribute('style', 'margin-left: -100%;');
      this.travaMenu = !this.travaMenu;

    }else if(screen.width <= 600 && this.travaMenu) {
      window.document.querySelector('.menu-responsivo')?.setAttribute('style', 'margin-left: 0%;');
      this.travaMenu = !this.travaMenu;

    }
  }

}
