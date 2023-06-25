import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { UserEntity } from '../user.entity';
export type UserDtoOptions = Partial<{
    isActive: boolean;
}>;
export declare class UserDto extends AbstractDto {
    firstName?: string;
    lastName?: string;
    username: string;
    role: RoleType;
    email?: string;
    avatar?: string;
    phone?: string;
    isActive?: boolean;
    constructor(user: UserEntity, options?: UserDtoOptions);
}
