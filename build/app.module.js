"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("./boilerplate.polyfill");
require("winston-daily-rotate-file");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const typeorm_1 = require("@nestjs/typeorm");
const nest_winston_1 = require("nest-winston");
const path_1 = __importDefault(require("path"));
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const winston_1 = require("winston");
const auth_module_1 = require("./modules/auth/auth.module");
const health_checker_module_1 = require("./modules/health-checker/health-checker.module");
const user_module_1 = require("./modules/user/user.module");
const api_config_service_1 = require("./shared/services/api-config.service");
const shared_module_1 = require("./shared/shared.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [shared_module_1.SharedModule],
                useFactory: async (configService) => configService.mariaConfig,
                inject: [api_config_service_1.ApiConfigService],
                dataSourceFactory: async (options) => {
                    if (!options) {
                        throw new Error('Invalid options passed');
                    }
                    return (0, typeorm_transactional_1.addTransactionalDataSource)(new typeorm_2.DataSource(options));
                },
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [shared_module_1.SharedModule],
                useFactory: async (configService) => configService.mongoConfig,
                inject: [api_config_service_1.ApiConfigService],
            }),
            common_1.CacheModule.register({
                imports: [shared_module_1.SharedModule],
                useFactory: async (configService) => configService.redisConfig,
                isGlobal: true,
                inject: [api_config_service_1.ApiConfigService],
            }),
            nest_winston_1.WinstonModule.forRootAsync({
                useFactory: async () => ({
                    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'hh:mm:ss DD-MM-YYYY' }), winston_1.format.ms(), winston_1.format.json(), winston_1.format.printf(({ level, message, timestamp }) => `[${timestamp}] [${level}] - ${message}`)),
                    transports: [
                        new winston_1.transports.Console({
                            level: 'debug',
                            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple(), winston_1.format.printf(({ level, message, timestamp }) => `[${timestamp}] [${level}] - ${message}`)),
                        }),
                        new winston_1.transports.DailyRotateFile({
                            filename: 'application-%DATE%.log',
                            dirname: path_1.default.join(__dirname, './../logs/debug/'),
                            datePattern: 'YYYY-MM-DD',
                            zippedArchive: true,
                            maxSize: '20m',
                            maxFiles: '90d',
                            level: 'debug',
                            json: true,
                        }),
                        new winston_1.transports.DailyRotateFile({
                            filename: 'application-%DATE%.log',
                            dirname: path_1.default.join(__dirname, './../logs/error/'),
                            datePattern: 'YYYY-MM-DD',
                            zippedArchive: true,
                            maxSize: '20m',
                            maxFiles: '90d',
                            level: 'error',
                            json: true,
                        }),
                    ],
                    exceptionHandlers: [
                        new winston_1.transports.Console({
                            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'hh:mm:ss DD-MM-YYYY' }), winston_1.format.ms(), winston_1.format.json()),
                        }),
                        new winston_1.transports.File({
                            dirname: path_1.default.join(__dirname, './../logs/exceptions/'),
                            filename: 'exceptions.log',
                            maxsize: 500000,
                        }),
                    ],
                    exitOnError: false,
                }),
                inject: [],
            }),
            health_checker_module_1.HealthCheckerModule,
        ],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map