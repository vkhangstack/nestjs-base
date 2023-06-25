import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  info(message: string) {
    return this.logger.info(message);
  }

  debug(message: string, content: object | string | number) {
    return this.logger.debug(`${message} ${JSON.stringify(content)}`);
  }

  error(message: string, content: object | string | number) {
    return this.logger.error(`${message} ${JSON.stringify(content)}`);
  }
}
