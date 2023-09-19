import { Controller, Get } from '@nestjs/common';

import {
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { IsPublic } from 'src/domain/decorators/public.decorator';

@Controller('health-check')
export class HealthController {
  constructor(
    private readonly healthCheck: HealthCheckService,
    private readonly mongoDbCheck: MongooseHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly http: HttpHealthIndicator, // private readonly prismaService: PrismaService,
  ) {}

  @IsPublic()
  @Get()
  @HealthCheck()
  async check() {
    return await this.healthCheck.check([
      ,
      () => this.mongoDbCheck.pingCheck(process.env.DATABASE_URL),
      () =>
        this.diskCheck.checkStorage('storage', {
          thresholdPercent: 0.9,
          path: '/',
        }),
      () => this.http.pingCheck('Bug Hunt (Site)', 'https://bughunt.com.br/'),
    ]);
  }
}
