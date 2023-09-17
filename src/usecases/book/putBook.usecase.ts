import { ILogger } from 'src/domain/logger/logger.interface';
import { BookM, UpdatedFieldsBook } from 'src/domain/model';
import { BookRepository } from 'src/domain/repositories';

export class PutBookUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string, book: UpdatedFieldsBook): Promise<BookM> {
    this.logger.log('Book Usecase', 'Updating one book !');
    return await this.bookRepository.updateContent(id, book);
  }
}
