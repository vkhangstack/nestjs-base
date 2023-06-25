import type { AbstractEntity } from '../common/abstract.entity';
import type { AbstractDto } from '../common/dto/abstract.dto';
import type { Constructor } from '../types';
export declare function UseDto(dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>): ClassDecorator;
