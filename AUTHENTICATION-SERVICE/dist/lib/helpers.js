"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Helpers {
    static hash_password(password) {
        const hash = crypto_1.default.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }
}
exports.default = Helpers;
