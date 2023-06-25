import type { HealthCheckResult } from '@nestjs/terminus';
import { HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, MicroserviceHealthIndicator, MongooseHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { LoggerService } from '../../shared/services/logger.service';
import { ServiceHealthIndicator } from './health-indicators/service.indicator';
export declare class HealthCheckerController {
    private healthCheckService;
    private ormIndicator;
    private serviceIndicator;
    private http;
    private mongooseIndicator;
    private memoryIndicator;
    private microServiceIndicator;
    private configService;
    private loggerService;
    constructor(healthCheckService: HealthCheckService, ormIndicator: TypeOrmHealthIndicator, serviceIndicator: ServiceHealthIndicator, http: HttpHealthIndicator, mongooseIndicator: MongooseHealthIndicator, memoryIndicator: MemoryHealthIndicator, microServiceIndicator: MicroserviceHealthIndicator, configService: ApiConfigService, loggerService: LoggerService);
    check(): Promise<HealthCheckResult>;
}
