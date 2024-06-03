"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_schema = new mongoose_1.default.Schema({
    _id: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, maxLenght: 20, minLength: 2 },
    firstname: { type: String, required: true, trim: true, maxLenght: 50, minLength: 2 },
    lastname: { type: String, required: true, trim: true, maxLenght: 50, minLength: 2 },
    password: { type: String, required: true },
    is_verified: { type: Boolean, default: false, required: true },
    email_verified: { type: Boolean, default: false, required: true },
    account_verified: { type: Boolean, default: false, required: true },
});
const User = mongoose_1.default.model("User", users_schema, "users");
exports.default = User;
