import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
export declare class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
    reflector: Reflector;
    constructor(reflector: Reflector);
    catch(exception: QueryFailedError & {
        constraint?: string;
    }, host: ArgumentsHost): void;
}
