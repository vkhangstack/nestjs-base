import { ClientProxy } from '@nestjs/microservices';
import type { HealthIndicatorResult } from '@nestjs/terminus';
import { HealthIndicator } from '@nestjs/terminus';
export declare class ServiceHealthIndicator extends HealthIndicator {
    private readonly clientProxy?;
    constructor(clientProxy?: ClientProxy);
    isHealthy(eventName: string): Promise<HealthIndicatorResult>;
}
