import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import type { UserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';
import type { IUserEntity } from './user.entity';
import { UserEntity } from './user.entity';
export interface IUserSettingsEntity extends IAbstractEntity<UserDto> {
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    user?: IUserEntity;
}
export declare class UserSettingsEntity extends AbstractEntity<UserDto, UserDtoOptions> implements IUserSettingsEntity {
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    userId?: string;
    user?: UserEntity;
}
