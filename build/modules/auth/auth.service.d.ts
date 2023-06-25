import { JwtService } from '@nestjs/jwt';
import type { RoleType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import type { UserLoginDto } from './dto/UserLoginDto';
export declare class AuthService {
    private jwtService;
    private configService;
    private userService;
    constructor(jwtService: JwtService, configService: ApiConfigService, userService: UserService);
    createAccessToken(data: {
        role: RoleType;
        userId: string;
    }): Promise<TokenPayloadDto>;
    validateUser(userLoginDto: UserLoginDto): Promise<UserEntity>;
}
