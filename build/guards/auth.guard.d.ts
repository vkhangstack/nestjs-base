import type { IAuthGuard, Type } from '@nestjs/passport';
export declare function AuthGuard(options?: Partial<{
    public: boolean;
}>): Type<IAuthGuard>;
