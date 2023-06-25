import type { AbstractDto } from './dto/abstract.dto';
export interface IAbstractEntity<DTO extends AbstractDto, O = never> {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    toDto(options?: O): DTO;
}
export declare abstract class AbstractEntity<DTO extends AbstractDto = AbstractDto, O = never> implements IAbstractEntity<DTO, O> {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    private dtoClass?;
    toDto(options?: O): DTO;
}
