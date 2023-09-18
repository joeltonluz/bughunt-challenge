import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { BookFactoryModule } from 'src/usecases/factories/book-factory.module';
import { BookController } from './book.controller';
import { DatabaseModule } from '../database/database.module';
import { UserFactoryModule } from 'src/usecases/factories/user-factory.module';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { AuthFactoryModule } from 'src/usecases/factories/auth-factory.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    DatabaseModule,
    BookFactoryModule.register(),
    UserFactoryModule.register(),
    AuthFactoryModule.register(),
  ],
  controllers: [
    HealthController,
    BookController,
    UserController,
    AuthController,
  ],
  providers: [],
})
export class ControllersModule {}
