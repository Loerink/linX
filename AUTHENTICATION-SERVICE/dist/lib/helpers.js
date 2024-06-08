"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
class Helpers {
    static hash_password(password) {
        const hash = crypto_1.default.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }
    static generate_user_token_from_payload(payload) {
        try {
            if (!process.env.JWT_SECRET) {
                return false;
            }
            return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    static generate_otp(length) {
        const possible_characters = "qwertyuiopasdfghjklzxcvbnm1234567890";
        let otp = "";
        for (let i = 0; i < length; i++) {
            const random_index = Math.floor((Math.random() * possible_characters.length));
            otp += possible_characters[random_index];
        }
        return otp;
    }
    static add_user_token(res, user) {
        const token_payload = {
            _id: user._id,
            is_verified: user.is_verified,
            email_verified: user.email_verified,
            account_verified: user.account_verified
        };
        const token = Helpers.generate_user_token_from_payload(token_payload);
        if (!token) {
            return false;
        }
        res.header({ authorization: token });
        return true;
    }
}
exports.default = Helpers;
