import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infra/logger/logger.module';
import { LoggerService } from 'src/infra/logger/logger.service';
import { DatabaseBookRepositories } from 'src/infra/repositories/book.repositories';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import {
  DeleteBookUseCase,
  GetBookUseCase,
  GetBooksUseCase,
  PostBookUseCase,
  PutAvailableBookUseCase,
  PutBookUseCase,
} from '../book';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class BookFactoryModule {
  static POST_BOOK = 'postBook';
  static GET_BOOKS = 'getBooks';
  static GET_BOOK = 'getBook';
  static PUT_BOOK = 'putBook';
  static PUT_AVAILABLE_BOOK = 'putAvailableBook';
  static DELETE_BOOK = 'deleteBook';

  static register(): DynamicModule {
    return {
      module: BookFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseBookRepositories],
          provide: BookFactoryModule.POST_BOOK,
          useFactory: (
            logger: LoggerService,
            bookRepository: DatabaseBookRepositories,
          ) => new PostBookUseCase(logger, bookRepository),
        },
        {
          inject: [LoggerService, DatabaseBookRepositories],
          provide: BookFactoryModule.GET_BOOKS,
          useFactory: (
            logger: LoggerService,
            bookRepository: DatabaseBookRepositories,
          ) => new GetBooksUseCase(logger, bookRepository),
        },
        {
          inject: [LoggerService, DatabaseBookRepositories],
          provide: BookFactoryModule.GET_BOOK,
          useFactory: (
            logger: LoggerService,
            bookRepository: DatabaseBookRepositories,
          ) => new GetBookUseCase(logger, bookRepository),
        },
        {
          inject: [LoggerService, DatabaseBookRepositories],
          provide: BookFactoryModule.PUT_BOOK,
          useFactory: (
            logger: LoggerService,
            bookRepository: DatabaseBookRepositories,
          ) => new PutBookUseCase(logger, bookRepository),
        },
        {
          inject: [LoggerService, DatabaseBookRepositories],
          provide: BookFactoryModule.PUT_AVAILABLE_BOOK,
          useFactory: (
            logger: LoggerService,
            bookRepository: DatabaseBookRepositories,
          ) => new PutAvailableBookUseCase(logger, bookRepository),
        },
        {
          inject: [LoggerService, DatabaseBookRepositories],
          provide: BookFactoryModule.DELETE_BOOK,
          useFactory: (
            logger: LoggerService,
            bookRepository: DatabaseBookRepositories,
          ) => new DeleteBookUseCase(logger, bookRepository),
        },
      ],
      exports: [
        BookFactoryModule.POST_BOOK,
        BookFactoryModule.GET_BOOKS,
        BookFactoryModule.GET_BOOK,
        BookFactoryModule.PUT_BOOK,
        BookFactoryModule.PUT_AVAILABLE_BOOK,
        BookFactoryModule.DELETE_BOOK,
      ],
    };
  }
}
