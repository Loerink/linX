"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
function configure_middleware(app) {
    app.use((0, body_parser_1.default)());
    app.use((0, cors_1.default)({
        exposedHeaders: ["authorization"],
    }));
}
exports.default = configure_middleware;
