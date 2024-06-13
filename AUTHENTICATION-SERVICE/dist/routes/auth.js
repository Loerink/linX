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
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const users_1 = __importDefault(require("../models/users"));
const helpers_1 = __importDefault(require("../lib/helpers"));
const users_2 = require("../models/users");
const { validate_register } = users_2.user_validation_schemas;
const { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = http_status_codes_1.default;
const auth_router = express_1.default.Router();
auth_router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validate_register.validate(req.body);
        if (error) {
            return res.status(BAD_REQUEST).json({ message: error.details[0].message });
        }
        const { email, password } = req.body;
        const user = yield users_1.default.findById(email);
        if (!user) {
            return res.status(UNAUTHORIZED).json({ message: "Wrong username/password" });
        }
        const hashed_password = helpers_1.default.hash_password(password);
        if (user.password !== hashed_password) {
            return res.status(UNAUTHORIZED).json({ message: "Wrong username/password" });
        }
        if (!helpers_1.default.add_user_token(res, user)) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error during auth" });
        }
        ;
        res.status(OK).json({ message: "Authentication successful" });
    }
    catch (err) {
        helpers_1.default.handle_internal_server_errors(res, err, "Internal server error during auth");
    }
}));
exports.default = auth_router;
