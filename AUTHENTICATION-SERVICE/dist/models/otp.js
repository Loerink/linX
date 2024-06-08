"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const parsed_config_file_1 = __importDefault(require("../parsed-config-file"));
const otp_schema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        length: parsed_config_file_1.default.otp_configs.otp_string_length
    },
    user: String,
    time_stamp: { type: Number, default: Date.now },
    expiry: { type: Number, default: () => { return Date.now() + parsed_config_file_1.default.otp_configs.otp_expiry_time_ms; } }
});
const Otp = mongoose_1.default.model("Otp", otp_schema, "otps");
exports.default = Otp;
