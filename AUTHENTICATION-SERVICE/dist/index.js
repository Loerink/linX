"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mogodb_1 = __importDefault(require("./lib/mogodb"));
const auth_1 = __importDefault(require("./routes/auth"));
const registration_1 = __importDefault(require("./routes/registration"));
dotenv_1.default.config();
const body_parser = require("body-parser");
(0, mogodb_1.default)();
const app = (0, express_1.default)();
app.use(body_parser());
app.use("/api/auth", auth_1.default);
app.use("/api/register", registration_1.default);
const server = http_1.default.createServer(app);
server.listen(process.env.HTTP_PORT, () => {
    console.log("\x1b[32m%s\x1b[0m", `[o] http server listening on port ${process.env.HTTP_PORT}`);
});
