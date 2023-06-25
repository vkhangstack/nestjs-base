import type { ClientProxy } from '@nestjs/microservices';
import type { Constructor } from '../types';
import type { PageDto } from './dto/page.dto';
export declare class AbstractClientService<ActionType> {
    private client;
    constructor(client: ClientProxy);
    send(pattern: ActionType, data: unknown): Promise<void>;
    send<R>(pattern: ActionType, data: unknown, returnDataOptions: {
        class: Constructor<R>;
        isPage: true;
    }): Promise<PageDto<R>>;
    send<R>(pattern: ActionType, data: unknown, returnDataOptions?: {
        class: Constructor<R>;
        isPage?: false;
    }): Promise<R>;
}
