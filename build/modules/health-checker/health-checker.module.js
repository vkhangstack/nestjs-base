"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckerModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const logger_service_1 = require("../../shared/services/logger.service");
const health_checker_controller_1 = require("./health-checker.controller");
const service_indicator_1 = require("./health-indicators/service.indicator");
let HealthCheckerModule = class HealthCheckerModule {
};
HealthCheckerModule = __decorate([
    (0, common_1.Module)({
        imports: [terminus_1.TerminusModule, axios_1.HttpModule],
        controllers: [health_checker_controller_1.HealthCheckerController],
        providers: [service_indicator_1.ServiceHealthIndicator, logger_service_1.LoggerService],
    })
], HealthCheckerModule);
exports.HealthCheckerModule = HealthCheckerModule;
//# sourceMappingURL=health-checker.module.js.map