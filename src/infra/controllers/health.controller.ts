import { Controller, Get } from '@nestjs/common';

import {
  PrismaHealthIndicator,
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health-check')
export class HealthController {
  constructor(
    private readonly healthCheck: HealthCheckService,
    private readonly prismaOrmCheck: PrismaHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return await this.healthCheck.check([
      //() => this.prismaOrmCheck.pingCheck('database'),
      () =>
        this.diskCheck.checkStorage('storage', {
          thresholdPercent: 0.9,
          path: '/',
        }),
      () => this.http.pingCheck('Bug Hunt (Site)', 'https://bughunt.com.br/'),
    ]);
  }
}
