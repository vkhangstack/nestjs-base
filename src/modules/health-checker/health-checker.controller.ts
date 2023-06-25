import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import type { HealthCheckResult } from '@nestjs/terminus';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { ServiceHealthIndicator } from './health-indicators/service.indicator';
@Controller('health')
export class HealthCheckerController {
  constructor(
    private healthCheckService: HealthCheckService,
    private ormIndicator: TypeOrmHealthIndicator,
    private serviceIndicator: ServiceHealthIndicator,
    private http: HttpHealthIndicator,
    private mongooseIndicator: MongooseHealthIndicator,
    private memoryIndicator: MemoryHealthIndicator,
    private microServiceIndicator: MicroserviceHealthIndicator,
    private configService: ApiConfigService,
    private loggerService: LoggerService,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    this.loggerService.info('test logget');
    this.loggerService.error('logger debug', { key: 'value' });

    return this.healthCheckService.check([
      () => this.ormIndicator.pingCheck('database', { timeout: 1500 }),
      () => this.serviceIndicator.isHealthy('nats-service-health'),
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.memoryIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      // () => this.memoryIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
      () =>
        this.microServiceIndicator.pingCheck('redis', {
          transport: Transport.REDIS,
          options: {
            host: this.configService.redisConfig.host,
            port: this.configService.redisConfig.port,
            // username: this.configService.redisConfig.username,
            password: this.configService.redisConfig.password,
          },
        }),
      () => this.mongooseIndicator.pingCheck('mongodb', { timeout: 1500 }),
    ]);
  }
}
