import { ILogger } from 'src/domain/logger/logger.interface';
import { BookM } from 'src/domain/model';
import { BookRepository } from 'src/domain/repositories';

export class GetBookUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string): Promise<BookM> {
    this.logger.log('Book Usecase', 'Searching one book !');
    return await this.bookRepository.findById(id);
  }
}
