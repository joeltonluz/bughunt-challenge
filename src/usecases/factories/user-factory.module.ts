import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infra/logger/logger.module';
import { LoggerService } from 'src/infra/logger/logger.service';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { DatabaseUserRepositories } from 'src/infra/repositories/user.repositories';
import { PostUserUseCase } from '../user/postUser.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class UserFactoryModule {
  static POST_USER = 'postUser';

  static register(): DynamicModule {
    return {
      module: UserFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseUserRepositories],
          provide: UserFactoryModule.POST_USER,
          useFactory: (
            logger: LoggerService,
            bookRepository: DatabaseUserRepositories,
          ) => new PostUserUseCase(logger, bookRepository),
        },
      ],
      exports: [UserFactoryModule.POST_USER],
    };
  }
}
