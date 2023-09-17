import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { DatabaseBookRepositories } from './book.repositories';
import { DatabaseUserRepositories } from './user.repositories';

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  providers: [DatabaseBookRepositories, DatabaseUserRepositories],
  exports: [DatabaseBookRepositories, DatabaseUserRepositories],
})
export class RepositoriesModule {}
