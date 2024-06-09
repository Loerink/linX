"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const mogodb_1 = __importDefault(require("./lib/mogodb"));
const configure_middleware_1 = __importDefault(require("./middleware/configure-middleware"));
const configure_routes_1 = __importDefault(require("./routes/configure-routes"));
require("./parsed-config-file");
require("./lib/types");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
(0, configure_middleware_1.default)(app);
(0, configure_routes_1.default)(app);
const server = http_1.default.createServer(app);
(0, mogodb_1.default)().then(() => {
    server.listen(process.env.HTTP_PORT, () => {
        console.log("\x1b[32m%s\x1b[0m", `[o] http server listening on port ${process.env.HTTP_PORT}`);
    });
}).catch(() => {
    console.error("\x1b[31m%s\x1b[0m", "could not connect to mongodb");
});
