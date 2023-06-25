import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../constants';
import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';
import type { IUserSettingsEntity } from './user-settings.entity';
import { UserSettingsEntity } from './user-settings.entity';
export interface IUserEntity extends IAbstractEntity<UserDto> {
    firstName?: string;
    lastName?: string;
    role: RoleType;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
    fullName?: string;
    settings?: IUserSettingsEntity;
}
export declare class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> implements IUserEntity {
    firstName?: string;
    lastName?: string;
    role: RoleType;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
    fullName?: string;
    settings?: UserSettingsEntity;
}
