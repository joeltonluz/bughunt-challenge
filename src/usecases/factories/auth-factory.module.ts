import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/infra/logger/logger.module';
import { LoggerService } from 'src/infra/logger/logger.service';
import { DatabaseAuthRepositories } from 'src/infra/repositories/auth.repositories';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { PostLoginUseCase } from '../auth/postLogin.usecase';

@Module({
  imports: [LoggerModule, RepositoriesModule],
})
export class AuthFactoryModule {
  static POST_LOGIN = 'postLogin';

  static register(): DynamicModule {
    return {
      module: AuthFactoryModule,
      providers: [
        {
          inject: [LoggerService, DatabaseAuthRepositories],
          provide: AuthFactoryModule.POST_LOGIN,
          useFactory: (
            logger: LoggerService,
            authRepository: DatabaseAuthRepositories,
          ) => new PostLoginUseCase(logger, authRepository),
        },
      ],
      exports: [AuthFactoryModule.POST_LOGIN],
    };
  }
}
