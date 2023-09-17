import { ILogger } from 'src/domain/logger/logger.interface';
import { BookM } from 'src/domain/model';
import { BookRepository } from 'src/domain/repositories';

export class GetBooksUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(available?: boolean): Promise<BookM[]> {
    this.logger.log('Book Usecase', 'Searching all books !');
    return await this.bookRepository.findAll(available);
  }
}
