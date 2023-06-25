import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import type { EntitySchema, FindOptionsWhere, ObjectType } from 'typeorm';
import { DataSource } from 'typeorm';
export declare class UniqueValidator implements ValidatorConstraintInterface {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    validate<E>(value: string, args: IUniqueValidationArguments<E>): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
type UniqueValidationConstraints<E> = [
    ObjectType<E> | EntitySchema<E> | string,
    (validationArguments: ValidationArguments) => FindOptionsWhere<E>
];
interface IUniqueValidationArguments<E> extends ValidationArguments {
    constraints: UniqueValidationConstraints<E>;
}
export declare function Unique<E>(constraints: Partial<UniqueValidationConstraints<E>>, validationOptions?: ValidationOptions): PropertyDecorator;
export {};
