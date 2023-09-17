import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { DatabaseBookRepositories } from './book.repositories';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  providers: [DatabaseBookRepositories],
  exports: [DatabaseBookRepositories],
})
export class RepositoriesModule {}
