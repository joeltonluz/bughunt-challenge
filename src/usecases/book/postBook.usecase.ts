import { ILogger } from 'src/domain/logger/logger.interface';
import { BookM } from 'src/domain/model';
import { BookRepository } from 'src/domain/repositories';

export class PostBookUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(book: BookM): Promise<BookM> {
    this.logger.log('Book Usecase', 'Add a new book !');
    return await this.bookRepository.insert(book);
  }
}
