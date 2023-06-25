import type { AbstractEntity } from '../abstract.entity';
export declare class AbstractDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(entity: AbstractEntity, options?: {
        excludeFields?: boolean;
    });
}
