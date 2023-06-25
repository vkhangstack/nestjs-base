import { Logger } from 'winston';
export declare class LoggerService {
    private readonly logger;
    constructor(logger: Logger);
    info(message: string): Logger;
    debug(message: string, content: object | string | number): Logger;
    error(message: string, content: object | string | number): Logger;
}
