import { Strategy } from 'passport-jwt';
import type { RoleType } from '../../constants';
import { TokenType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userService;
    constructor(configService: ApiConfigService, userService: UserService);
    validate(args: {
        userId: string;
        role: RoleType;
        type: TokenType;
    }): Promise<UserEntity>;
}
export {};
