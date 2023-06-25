import { UserDto } from '../../user/dtos/user.dto';
import { TokenPayloadDto } from './TokenPayloadDto';
export declare class LoginPayloadDto {
    user: UserDto;
    token: TokenPayloadDto;
    constructor(user: UserDto, token: TokenPayloadDto);
}
