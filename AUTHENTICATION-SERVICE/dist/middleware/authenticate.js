"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authentication_middleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.headers);
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: "No token found in request headers" });
        }
        if (!process.env.JWT_SECRET) {
            console.error("No JWT_SECRET in env variables");
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error during auth" });
        }
        const token_payload = jsonwebtoken_1.default.verify(auth, process.env.JWT_SECRET);
        if (!token_payload || typeof (token_payload) == "string") {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: "Invalid token found in request headers" });
        }
        const user = yield users_1.default.findById(token_payload._id);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: "Invalid token found in request headers" });
        }
        req.user = user;
        next();
    });
}
exports.default = authentication_middleware;
