import { ILogger } from 'src/domain/logger/logger.interface';
import { BookRepository } from 'src/domain/repositories';

export class DeleteBookUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log('Book Usecase', 'Deleting one book !');
    await this.bookRepository.deleteById(id);
    return;
  }
}
