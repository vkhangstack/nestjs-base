import type { ITranslationDecoratorInterface } from '../interfaces';
export declare const STATIC_TRANSLATION_DECORATOR_KEY = "custom:static-translate";
export declare const DYNAMIC_TRANSLATION_DECORATOR_KEY = "custom:dynamic-translate";
export declare function StaticTranslate(data?: ITranslationDecoratorInterface): PropertyDecorator;
export declare function DynamicTranslate(): PropertyDecorator;
