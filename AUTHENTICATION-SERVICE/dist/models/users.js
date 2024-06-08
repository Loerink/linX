"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const parsed_config_file_1 = __importDefault(require("../parsed-config-file"));
const users_schema = new mongoose_1.default.Schema({
    _id: { type: String, required: true, trim: true },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLenght: parsed_config_file_1.default.user_configs.maximum_username_length,
        minLength: parsed_config_file_1.default.user_configs.minimum_username_length
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLenght: parsed_config_file_1.default.user_configs.maximum_firstname_length,
        minLength: parsed_config_file_1.default.user_configs.minimum_firstname_length
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLenght: parsed_config_file_1.default.user_configs.maximum_lastname_length,
        minLength: parsed_config_file_1.default.user_configs.minimum_lastname_length
    },
    password: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    email_verified: { type: Boolean, default: false },
    account_verified: { type: Boolean, default: false },
});
const User = mongoose_1.default.model("User", users_schema, "users");
exports.default = User;
