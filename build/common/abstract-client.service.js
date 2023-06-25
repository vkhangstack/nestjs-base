"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractClientService = void 0;
const class_transformer_1 = require("class-transformer");
const rxjs_1 = require("rxjs");
const page_type_exception_1 = require("../exceptions/page-type.exception");
class AbstractClientService {
    constructor(client) {
        this.client = client;
    }
    async send(pattern, data, returnDataOptions) {
        const returnData = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, data), {
            defaultValue: undefined,
        });
        if ((returnDataOptions === null || returnDataOptions === void 0 ? void 0 : returnDataOptions.isPage) && (!(returnData === null || returnData === void 0 ? void 0 : returnData.data) || !returnData.meta)) {
            throw new page_type_exception_1.PageTypeException();
        }
        if (!(returnDataOptions === null || returnDataOptions === void 0 ? void 0 : returnDataOptions.class) || returnDataOptions.isPage) {
            return returnData;
        }
        return (0, class_transformer_1.plainToInstance)(returnDataOptions.class, returnData);
    }
}
exports.AbstractClientService = AbstractClientService;
//# sourceMappingURL=abstract-client.service.js.map