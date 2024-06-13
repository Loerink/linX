"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otp_validation_schemas = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parsed_config_file_1 = __importDefault(require("../parsed-config-file"));
const { otp_configs } = parsed_config_file_1.default;
const { otp_expiry_time_ms, otp_string_length } = otp_configs;
const joi_1 = __importDefault(require("joi"));
const otp_schema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        length: otp_string_length
    },
    user: String,
    time_stamp: { type: Number, default: Date.now },
    expiry: { type: Number, default: () => { return Date.now() + otp_expiry_time_ms; } }
});
const otp_validation_schemas = {
    validate_verify_email: joi_1.default.object({
        otp: joi_1.default.string().required().min(otp_string_length).max(otp_string_length)
    })
};
exports.otp_validation_schemas = otp_validation_schemas;
const Otp = mongoose_1.default.model("Otp", otp_schema, "otps");
exports.default = Otp;
