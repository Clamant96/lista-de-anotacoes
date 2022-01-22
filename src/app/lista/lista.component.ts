import { CategoriaService } from './../service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../models/Categoria';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public categoria: Categoria = new Categoria();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    let id = this.route.snapshot.params['id'];

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    this.findByIdListaCategoria(id);

  }

  findByIdListaCategoria(id: number) {
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;

    });
  }

}
