import { Module } from '@nestjs/common';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { ControllersModule } from './infra/controllers/controllers.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './domain/guards/auth.guard';

@Module({
  imports: [LoggerModule, ExceptionsModule, ControllersModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
