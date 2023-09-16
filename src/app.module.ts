import { Module } from '@nestjs/common';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { ControllersModule } from './infra/controllers/controllers.module';

@Module({
  imports: [LoggerModule, ExceptionsModule, ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
