import 'source-map-support/register';
import type { ObjectLiteral } from 'typeorm';
import type { AbstractEntity } from './common/abstract.entity';
import type { AbstractDto } from './common/dto/abstract.dto';
import { PageDto } from './common/dto/page.dto';
import { PageMetaDto } from './common/dto/page-meta.dto';
import type { PageOptionsDto } from './common/dto/page-options.dto';
import type { KeyOfType } from './types';
declare global {
    export type Uuid = string & {
        _uuidBrand: undefined;
    };
    interface Array<T> {
        toDtos<Dto extends AbstractDto>(this: T[], options?: unknown): Dto[];
        toPageDto<Dto extends AbstractDto>(this: T[], pageMetaDto: PageMetaDto, options?: unknown): PageDto<Dto>;
    }
}
declare module 'typeorm' {
    interface QueryBuilder<Entity> {
        searchByString(q: string, columnNames: string[]): this;
    }
    interface SelectQueryBuilder<Entity> {
        paginate(this: SelectQueryBuilder<Entity>, pageOptionsDto: PageOptionsDto, options?: Partial<{
            takeAll: boolean;
        }>): Promise<[Entity[], PageMetaDto]>;
        leftJoinAndSelect<AliasEntity extends AbstractEntity, A extends string>(this: SelectQueryBuilder<Entity>, property: `${A}.${Exclude<KeyOfType<AliasEntity, AbstractEntity>, symbol>}`, alias: string, condition?: string, parameters?: ObjectLiteral): this;
        leftJoin<AliasEntity extends AbstractEntity, A extends string>(this: SelectQueryBuilder<Entity>, property: `${A}.${Exclude<KeyOfType<AliasEntity, AbstractEntity>, symbol>}`, alias: string, condition?: string, parameters?: ObjectLiteral): this;
        innerJoinAndSelect<AliasEntity extends AbstractEntity, A extends string>(this: SelectQueryBuilder<Entity>, property: `${A}.${Exclude<KeyOfType<AliasEntity, AbstractEntity>, symbol>}`, alias: string, condition?: string, parameters?: ObjectLiteral): this;
        innerJoin<AliasEntity extends AbstractEntity, A extends string>(this: SelectQueryBuilder<Entity>, property: `${A}.${Exclude<KeyOfType<AliasEntity, AbstractEntity>, symbol>}`, alias: string, condition?: string, parameters?: ObjectLiteral): this;
    }
}
