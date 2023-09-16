import { BookM } from '../model/book';

export interface BookRepository {
  insert(todo: BookM): Promise<BookM>; //Cadastrar um livro
  findAll(): Promise<BookM[]>; //Listar todos os livros
  findAvailable(available: boolean): Promise<BookM[]>; //Listar Livros Disponiveis
  findById(id: string): Promise<BookM>; //Listar Livros Específico
  updateContent(id: string, book: Omit<BookM, 'id'>): Promise<BookM>; //Editar um livro de acordo com o ID informado
  reserveContent(id: string, available: boolean): Promise<BookM>; //Reservar um livro (available: true/false)
  deleteById(id: string): Promise<void>; //Excluir o registro de um livro de acordo com o ID
}
