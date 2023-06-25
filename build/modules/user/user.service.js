"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const exceptions_1 = require("../../exceptions");
const aws_s3_service_1 = require("../../shared/services/aws-s3.service");
const validator_service_1 = require("../../shared/services/validator.service");
const UserRegisterDto_1 = require("../auth/dto/UserRegisterDto");
const create_settings_command_1 = require("./commands/create-settings.command");
const create_settings_dto_1 = require("./dtos/create-settings.dto");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository, validatorService, awsS3Service, commandBus) {
        this.userRepository = userRepository;
        this.validatorService = validatorService;
        this.awsS3Service = awsS3Service;
        this.commandBus = commandBus;
    }
    findOne(findData) {
        return this.userRepository.findOneBy(findData);
    }
    async findByUsernameOrEmail(options) {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.settings', 'settings');
        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.username,
            });
        }
        return queryBuilder.getOne();
    }
    async createUser(userRegisterDto, file) {
        const user = this.userRepository.create(userRegisterDto);
        if (file && !this.validatorService.isImage(file.mimetype)) {
            throw new exceptions_1.FileNotImageException();
        }
        if (file) {
            user.avatar = await this.awsS3Service.uploadImage(file);
        }
        await this.userRepository.save(user);
        user.settings = await this.createSettings(user.id, (0, class_transformer_1.plainToClass)(create_settings_dto_1.CreateSettingsDto, {
            isEmailVerified: false,
            isPhoneVerified: false,
        }));
        return user;
    }
    async getUsers(pageOptionsDto) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        return items.toPageDto(pageMetaDto);
    }
    async getUser(userId) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        queryBuilder.where('user.id = :userId', { userId });
        const userEntity = await queryBuilder.getOne();
        if (!userEntity) {
            throw new exceptions_1.UserNotFoundException();
        }
        return userEntity.toDto();
    }
    async createSettings(userId, createSettingsDto) {
        return this.commandBus.execute(new create_settings_command_1.CreateSettingsCommand(userId, createSettingsDto));
    }
};
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "createUser", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        validator_service_1.ValidatorService,
        aws_s3_service_1.AwsS3Service,
        cqrs_1.CommandBus])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map