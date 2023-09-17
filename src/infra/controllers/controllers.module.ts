import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { BookFactoryModule } from 'src/usecases/factories/book-factory.module';
import { BookController } from './book.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    DatabaseModule,
    BookFactoryModule.register(),
  ],
  controllers: [HealthController, BookController],
  providers: [],
})
export class ControllersModule {}
