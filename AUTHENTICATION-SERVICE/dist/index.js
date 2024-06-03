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
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = __importDefault(require("./lib/helpers"));
const mogodb_1 = __importDefault(require("./lib/mogodb"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const users_1 = __importDefault(require("./models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const body_parser = require("body-parser");
(0, mogodb_1.default)();
const app = (0, express_1.default)();
app.use(body_parser());
app.post("/api/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_1.default.findById(email);
        if (!user) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({ message: "Wrong username/password" });
        }
        const hashed_password = helpers_1.default.hash_password(password);
        if (user.password !== hashed_password) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({ message: "Wrong username/password" });
        }
        const token_payload = {
            id: user._id,
            is_verified: user.is_verified,
            email_verified: user.email_verified,
            account_verified: user.account_verified
        };
        if (!process.env.JWT_SECRET) {
            return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: "Internal server error during auth" });
        }
        const token = jsonwebtoken_1.default.sign(token_payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(http_status_codes_1.default.OK).header({ auth: token }).json({ message: "Authentication successful" });
    }
    catch (err) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ message: "Internal server error during auth" });
        console.error("Error during auth", err);
    }
}));
const server = http_1.default.createServer(app);
server.listen(process.env.HTTP_PORT, () => {
    console.log("\x1b[32m%s\x1b[0m", `[o] http server listening on port ${process.env.HTTP_PORT}`);
});
