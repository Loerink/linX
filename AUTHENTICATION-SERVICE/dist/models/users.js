"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_validation_schemas = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parsed_config_file_1 = __importDefault(require("../parsed-config-file"));
const joi_1 = __importDefault(require("joi"));
const { user_configs } = parsed_config_file_1.default;
const { maximum_firstname_length, minimum_firstname_length, minimum_username_length, maximum_username_length, maximum_lastname_length, minimum_lastname_length } = user_configs;
const users_schema = new mongoose_1.default.Schema({
    _id: { type: String, required: true, trim: true },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLenght: maximum_username_length,
        minLength: minimum_username_length
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLenght: maximum_firstname_length,
        minLength: minimum_firstname_length
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLenght: maximum_lastname_length,
        minLength: minimum_lastname_length
    },
    password: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    email_verified: { type: Boolean, default: false },
    account_verified: { type: Boolean, default: false },
});
const user_validation_schemas = {
    validate_register: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    }),
    validate_verify_account: joi_1.default.object({
        firstname: joi_1.default.string().min(minimum_firstname_length).max(maximum_firstname_length).required(),
        lastname: joi_1.default.string().min(minimum_lastname_length).max(maximum_lastname_length).required(),
        username: joi_1.default.string().min(minimum_username_length).max(maximum_username_length).required(),
    })
};
exports.user_validation_schemas = user_validation_schemas;
const User = mongoose_1.default.model("User", users_schema, "users");
exports.default = User;
