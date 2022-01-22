import { Categoria } from './Categoria';

export class Usuario {
  public id: number;
  public username: string;
  public senha: string;
  public categoria: Categoria[];
  public avatar: string;
}
