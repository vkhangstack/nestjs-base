import './boilerplate.polyfill';
import 'winston-daily-rotate-file';

import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import path from 'path';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { format, transports } from 'winston';

import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (configService: ApiConfigService) =>
        configService.mariaConfig,
      inject: [ApiConfigService],
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (configService: ApiConfigService) =>
        configService.mongoConfig,
      inject: [ApiConfigService],
    }),
    CacheModule.register({
      imports: [SharedModule],
      useFactory: async (configService: ApiConfigService) =>
        configService.redisConfig,
      isGlobal: true,
      inject: [ApiConfigService],
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'NOTIFICATIONS_SERVICE',
    //     imports: [SharedModule],
    //     inject: [ApiConfigService],
    //     useFactory: async (_configService: ApiConfigService) => ({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: ['amqp://localhost:5672'],
    //         queue: 'notifications',
    //         queueOptions: {
    //           durable: false,
    //         },
    //       },
    //     }),
    //   },
    //   {
    //     name: 'QUEUE_SERVICE',
    //     imports: [SharedModule],
    //     inject: [ApiConfigService],
    //     useFactory: async (_configService: ApiConfigService) => ({
    //       name: 'HERO_SERVICE',
    //       transport: Transport.KAFKA,
    //       options: {
    //         client: {
    //           clientId: 'hero',
    //           brokers: ['localhost:9092'],
    //         },
    //         consumer: {
    //           groupId: 'hero-consumer',
    //         },
    //       },
    //     }),
    //   },
    // ]),
    WinstonModule.forRootAsync({
      useFactory: async () => ({
        format: format.combine(
          format.timestamp({ format: 'hh:mm:ss DD-MM-YYYY' }),
          format.ms(),
          format.json(),
          format.printf(
            ({ level, message, timestamp }) =>
              `[${timestamp}] [${level}] - ${message}`,
          ),
        ),
        transports: [
          new transports.Console({
            level: 'debug',
            format: format.combine(
              format.colorize(),
              format.simple(),
              format.printf(
                ({ level, message, timestamp }) =>
                  `[${timestamp}] [${level}] - ${message}`,
              ),
            ),
          }),
          new transports.DailyRotateFile({
            filename: 'application-%DATE%.log',
            dirname: path.join(__dirname, './../logs/debug/'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '90d',
            level: 'debug',
            json: true,
          }),
          new transports.DailyRotateFile({
            filename: 'application-%DATE%.log',
            dirname: path.join(__dirname, './../logs/error/'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '90d',
            level: 'error',
            json: true,
          }),
        ],
        exceptionHandlers: [
          new transports.Console({
            format: format.combine(
              format.timestamp({ format: 'hh:mm:ss DD-MM-YYYY' }),
              format.ms(),
              format.json(),
            ),
          }),
          new transports.File({
            dirname: path.join(__dirname, './../logs/exceptions/'),
            filename: 'exceptions.log',
            maxsize: 500_000,
          }),
        ],
        exitOnError: false,
      }),
      inject: [],
    }),
    HealthCheckerModule,
  ],
  providers: [],
})
export class AppModule {}
