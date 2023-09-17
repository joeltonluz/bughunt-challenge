import { Controller, Get } from '@nestjs/common';

import {
  PrismaHealthIndicator,
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../database/prisma/prisma.service';

@Controller('health-check')
export class HealthController {
  constructor(
    private readonly healthCheck: HealthCheckService,
    private readonly prismaOrmCheck: PrismaHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return await this.healthCheck.check([
      ,
      // () => this.prismaService.$queryRaw`SELECT 1`,
      () =>
        this.diskCheck.checkStorage('storage', {
          thresholdPercent: 0.9,
          path: '/',
        }),
      () => this.http.pingCheck('Bug Hunt (Site)', 'https://bughunt.com.br/'),
    ]);
  }
}
