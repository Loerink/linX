"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function parse_json_file_to_object() {
    const file_string = fs_1.default.readFileSync(`${__dirname}/../../config.json`, "ascii");
    return JSON.parse(file_string);
}
exports.default = parse_json_file_to_object();
