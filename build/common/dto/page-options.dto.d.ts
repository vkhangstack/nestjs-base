import { Order } from '../../constants';
export declare class PageOptionsDto {
    readonly order: Order;
    readonly page: number;
    readonly take: number;
    get skip(): number;
    readonly q?: string;
}
