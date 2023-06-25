"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription(`description`);
    if (process.env.API_VERSION) {
        documentBuilder.setVersion(process.env.API_VERSION);
    }
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build());
    swagger_1.SwaggerModule.setup('documentation', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    console.info(`Documentation: http://localhost:${process.env.PORT}/documentation`);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map