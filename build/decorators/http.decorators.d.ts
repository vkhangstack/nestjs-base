import type { PipeTransform } from '@nestjs/common';
import type { Type } from '@nestjs/common/interfaces';
import type { RoleType } from '../constants';
export declare function Auth(roles?: RoleType[], options?: Partial<{
    public: boolean;
}>): MethodDecorator;
export declare function UUIDParam(property: string, ...pipes: Array<Type<PipeTransform> | PipeTransform>): ParameterDecorator;
