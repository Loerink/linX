"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const registration_1 = __importDefault(require("./registration"));
function configure_routes(app) {
    app.use("/api/auth", auth_1.default);
    app.use("/api/register", registration_1.default);
}
exports.default = configure_routes;
;
