import { PageDto } from '../../common/dto/page.dto';
import { UserDto } from './dtos/user.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    admin(user: UserEntity): Promise<{
        text: string;
    }>;
    getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<PageDto<UserDto>>;
    getUser(userId: string): Promise<UserDto>;
}
