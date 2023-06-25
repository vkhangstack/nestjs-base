"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const terminus_1 = require("@nestjs/terminus");
const api_config_service_1 = require("../../shared/services/api-config.service");
const logger_service_1 = require("../../shared/services/logger.service");
const service_indicator_1 = require("./health-indicators/service.indicator");
let HealthCheckerController = class HealthCheckerController {
    constructor(healthCheckService, ormIndicator, serviceIndicator, http, mongooseIndicator, memoryIndicator, microServiceIndicator, configService, loggerService) {
        this.healthCheckService = healthCheckService;
        this.ormIndicator = ormIndicator;
        this.serviceIndicator = serviceIndicator;
        this.http = http;
        this.mongooseIndicator = mongooseIndicator;
        this.memoryIndicator = memoryIndicator;
        this.microServiceIndicator = microServiceIndicator;
        this.configService = configService;
        this.loggerService = loggerService;
    }
    async check() {
        this.loggerService.info('test logget');
        this.loggerService.error('logger debug', { key: 'value' });
        return this.healthCheckService.check([
            () => this.ormIndicator.pingCheck('database', { timeout: 1500 }),
            () => this.serviceIndicator.isHealthy('nats-service-health'),
            () => this.http.pingCheck('google', 'https://google.com'),
            () => this.memoryIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.microServiceIndicator.pingCheck('redis', {
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: this.configService.redisConfig.host,
                    port: this.configService.redisConfig.port,
                    password: this.configService.redisConfig.password,
                },
            }),
            () => this.mongooseIndicator.pingCheck('mongodb', { timeout: 1500 }),
        ]);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthCheckerController.prototype, "check", null);
HealthCheckerController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.TypeOrmHealthIndicator,
        service_indicator_1.ServiceHealthIndicator,
        terminus_1.HttpHealthIndicator,
        terminus_1.MongooseHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        terminus_1.MicroserviceHealthIndicator,
        api_config_service_1.ApiConfigService,
        logger_service_1.LoggerService])
], HealthCheckerController);
exports.HealthCheckerController = HealthCheckerController;
//# sourceMappingURL=health-checker.controller.js.map