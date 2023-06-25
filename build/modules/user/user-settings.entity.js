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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingsEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../common/abstract.entity");
const decorators_1 = require("../../decorators");
const user_dto_1 = require("./dtos/user.dto");
const user_entity_1 = require("./user.entity");
let UserSettingsEntity = class UserSettingsEntity extends abstract_entity_1.AbstractEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserSettingsEntity.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserSettingsEntity.prototype, "isPhoneVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], UserSettingsEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.settings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserSettingsEntity.prototype, "user", void 0);
UserSettingsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_settings' }),
    (0, decorators_1.UseDto)(user_dto_1.UserDto)
], UserSettingsEntity);
exports.UserSettingsEntity = UserSettingsEntity;
//# sourceMappingURL=user-settings.entity.js.map