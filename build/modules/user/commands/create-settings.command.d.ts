import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import type { CreateSettingsDto } from '../dtos/create-settings.dto';
import { UserSettingsEntity } from '../user-settings.entity';
export declare class CreateSettingsCommand implements ICommand {
    readonly userId: string;
    readonly createSettingsDto: CreateSettingsDto;
    constructor(userId: string, createSettingsDto: CreateSettingsDto);
}
export declare class CreateSettingsHandler implements ICommandHandler<CreateSettingsCommand, UserSettingsEntity> {
    private userSettingsRepository;
    constructor(userSettingsRepository: Repository<UserSettingsEntity>);
    execute(command: CreateSettingsCommand): Promise<UserSettingsEntity>;
}
