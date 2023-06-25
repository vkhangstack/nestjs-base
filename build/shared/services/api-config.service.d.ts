import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
export declare class ApiConfigService {
    private configService;
    constructor(configService: ConfigService);
    get isDevelopment(): boolean;
    get isProduction(): boolean;
    get isTest(): boolean;
    private getNumber;
    private getBoolean;
    private getString;
    get nodeEnv(): string;
    get mariaConfig(): TypeOrmModuleOptions;
    get awsS3Config(): {
        bucketRegion: string;
        bucketApiVersion: string;
        bucketName: string;
    };
    get mongoConfig(): {
        uri: string;
        retryAttempts: number;
        lazyConnection: boolean;
    };
    get redisConfig(): {
        store: typeof redisStore;
        host: string;
        port: number;
        username: string;
        password: string;
    };
    get documentationEnabled(): boolean;
    get natsEnabled(): boolean;
    get natsConfig(): {
        host: string;
        port: number;
    };
    get authConfig(): {
        privateKey: string;
        publicKey: string;
        jwtExpirationTime: number;
    };
    get appConfig(): {
        port: string;
        host: string;
    };
    private get;
}
