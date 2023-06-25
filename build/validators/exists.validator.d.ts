import type { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import type { EntitySchema, FindOptionsWhere, ObjectType } from 'typeorm';
import { DataSource } from 'typeorm';
export declare class ExistsValidator implements ValidatorConstraintInterface {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    validate<E>(value: string, args: IExistsValidationArguments<E>): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
type ExistsValidationConstraints<E> = [
    ObjectType<E> | EntitySchema<E> | string,
    (validationArguments: ValidationArguments) => FindOptionsWhere<E>
];
interface IExistsValidationArguments<E> extends ValidationArguments {
    constraints: ExistsValidationConstraints<E>;
}
export declare function Exists<E>(constraints: Partial<ExistsValidationConstraints<E>>, validationOptions?: ValidationOptions): PropertyDecorator;
export {};
