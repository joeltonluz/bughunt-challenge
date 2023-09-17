import { ILogger } from 'src/domain/logger/logger.interface';
import { BookM } from 'src/domain/model';
import { BookRepository } from 'src/domain/repositories';

export class PutAvailableBookUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string, available: boolean): Promise<BookM> {
    this.logger.log('Book Usecase', 'Reserving book !');
    return await this.bookRepository.reserveContent(id, available);
  }
}
