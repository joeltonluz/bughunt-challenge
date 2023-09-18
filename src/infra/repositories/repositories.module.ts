import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseBookRepositories } from './book.repositories';
import { DatabaseUserRepositories } from './user.repositories';
import { DatabaseAuthRepositories } from './auth.repositories';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ExceptionsModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    DatabaseBookRepositories,
    DatabaseUserRepositories,
    DatabaseAuthRepositories,
  ],
  exports: [
    DatabaseBookRepositories,
    DatabaseUserRepositories,
    DatabaseAuthRepositories,
  ],
})
export class RepositoriesModule {}
