import { BookM, UpdatedFieldsBook } from '../model/book';

export interface BookRepository {
  insert(book: BookM): Promise<BookM>; //Cadastrar um livro
  findAll(available?: boolean): Promise<BookM[]>; //Listar todos os livros ou disponíveis
  findById(id: string): Promise<BookM>; //Listar Livros Específico
  updateContent(id: string, book: UpdatedFieldsBook): Promise<BookM>; //Editar um livro de acordo com o ID informado
  reserveContent(id: string, available: boolean): Promise<BookM>; //Reservar um livro (available: true/false)
  deleteById(id: string): Promise<void>; //Excluir o registro de um livro de acordo com o ID
}
