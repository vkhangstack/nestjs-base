import { CommandBus } from '@nestjs/cqrs';
import type { FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';
import type { PageDto } from '../../common/dto/page.dto';
import { IFile } from '../../interfaces';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { CreateSettingsDto } from './dtos/create-settings.dto';
import type { UserDto } from './dtos/user.dto';
import type { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import type { UserSettingsEntity } from './user-settings.entity';
export declare class UserService {
    private userRepository;
    private validatorService;
    private awsS3Service;
    private commandBus;
    constructor(userRepository: Repository<UserEntity>, validatorService: ValidatorService, awsS3Service: AwsS3Service, commandBus: CommandBus);
    findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null>;
    findByUsernameOrEmail(options: Partial<{
        username: string;
        email: string;
    }>): Promise<UserEntity | null>;
    createUser(userRegisterDto: UserRegisterDto, file?: IFile): Promise<UserEntity>;
    getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<PageDto<UserDto>>;
    getUser(userId: string): Promise<UserDto>;
    createSettings(userId: string, createSettingsDto: CreateSettingsDto): Promise<UserSettingsEntity>;
}
