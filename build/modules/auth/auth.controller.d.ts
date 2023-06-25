import { IFile } from '../../interfaces';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    userLogin(userLoginDto: UserLoginDto): Promise<LoginPayloadDto>;
    userRegister(userRegisterDto: UserRegisterDto, file?: IFile): Promise<UserDto>;
    getCurrentUser(user: UserEntity): UserDto;
}
