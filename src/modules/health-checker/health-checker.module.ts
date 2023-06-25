import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { LoggerService } from '../../shared/services/logger.service';
import { HealthCheckerController } from './health-checker.controller';
import { ServiceHealthIndicator } from './health-indicators/service.indicator';
@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckerController],
  providers: [ServiceHealthIndicator, LoggerService],
})
export class HealthCheckerModule {}
