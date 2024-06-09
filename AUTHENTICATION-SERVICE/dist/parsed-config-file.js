"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const file_string = fs_1.default.readFileSync(`${__dirname}/../../config.json`, "ascii");
const parsed_file = JSON.parse(file_string);
exports.default = parsed_file;
