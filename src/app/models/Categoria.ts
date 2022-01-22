import { Lista } from './Lista';
import { Usuario } from './Usuario';

export class Categoria {
  public id: number;
  public nome: string;
  public usuario: Usuario;
  public lista: Lista[];
}
