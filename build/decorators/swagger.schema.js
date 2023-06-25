"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const route_paramtypes_enum_1 = require("@nestjs/common/enums/route-paramtypes.enum");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const reverse_object_keys_util_1 = require("@nestjs/swagger/dist/utils/reverse-object-keys.util");
const lodash_1 = __importDefault(require("lodash"));
function explore(instance, propertyKey) {
    const types = Reflect.getMetadata(constants_1.PARAMTYPES_METADATA, instance, propertyKey);
    const routeArgsMetadata = Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, instance.constructor, propertyKey) || {};
    const parametersWithType = lodash_1.default.mapValues((0, reverse_object_keys_util_1.reverseObjectKeys)(routeArgsMetadata), (param) => ({
        type: types[param.index],
        name: param.data,
        required: true,
    }));
    for (const [key, value] of Object.entries(parametersWithType)) {
        const keyPair = key.split(':');
        if (Number(keyPair[0]) === route_paramtypes_enum_1.RouteParamtypes.BODY) {
            return value.type;
        }
    }
}
function RegisterModels() {
    return (target, propertyKey, descriptor) => {
        const body = explore(target, propertyKey);
        return body && (0, swagger_1.ApiExtraModels)(body)(target, propertyKey, descriptor);
    };
}
function ApiFileDecorator(files = [], options = {}) {
    return (target, propertyKey, descriptor) => {
        const { isRequired = false } = options;
        const fileSchema = {
            type: 'string',
            format: 'binary',
        };
        const properties = {};
        for (const file of files) {
            if (file.isArray) {
                properties[file.name] = {
                    type: 'array',
                    items: fileSchema,
                };
            }
            else {
                properties[file.name] = fileSchema;
            }
        }
        let schema = {
            properties,
            type: 'object',
        };
        const body = explore(target, propertyKey);
        if (body) {
            schema = {
                allOf: [
                    {
                        $ref: (0, swagger_1.getSchemaPath)(body),
                    },
                    { properties, type: 'object' },
                ],
            };
        }
        return (0, swagger_1.ApiBody)({
            schema,
            required: isRequired,
        })(target, propertyKey, descriptor);
    };
}
function ApiFile(files, options = {}) {
    const filesArray = lodash_1.default.castArray(files);
    const apiFileInterceptors = filesArray.map((file) => file.isArray
        ? (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)(file.name))
        : (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(file.name)));
    return (0, common_1.applyDecorators)(RegisterModels(), (0, swagger_1.ApiConsumes)('multipart/form-data'), ApiFileDecorator(filesArray, options), ...apiFileInterceptors);
}
exports.ApiFile = ApiFile;
//# sourceMappingURL=swagger.schema.js.map