"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
void (0, main_1.bootstrap)().then((app) => {
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => void app.close());
    }
});
//# sourceMappingURL=main.hmr.js.map