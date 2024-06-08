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
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const otp_1 = __importDefault(require("../models/otp"));
const parsed_config_file_1 = __importDefault(require("../parsed-config-file"));
const notification_service_1 = __importDefault(require("../lib/notification-service"));
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED, NOT_FOUND, CONFLICT } = http_status_codes_1.default;
const registration_router = express_1.default.Router();
function handle_internal_server_errors(res, err, message) {
    console.error(err);
    return res.status(INTERNAL_SERVER_ERROR).json({ message });
}
registration_router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (yield users_1.default.exists({ _id: email })) {
            return res.status(CONFLICT).json({ message: "user already exists" });
        }
        yield users_1.default.create({
            _id: email,
            password: helpers_1.default.hash_password(password)
        });
        const token_payload = {
            _id: email,
            account_verified: false,
            email_verified: false,
            is_verified: false
        };
        const token = helpers_1.default.generate_user_token_from_payload(token_payload);
        if (!token) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error occured during registration" });
        }
        const otp = helpers_1.default.generate_otp(parsed_config_file_1.default.otp_configs.otp_string_length);
        yield otp_1.default.create({ _id: otp });
        const email_sent_successfully = yield notification_service_1.default.send_otp_email(email, otp);
        if (!email_sent_successfully) {
            yield otp_1.default.findOneAndDelete({ _id: otp });
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error occured trying to send otp" });
        }
        return res.status(CREATED).json({ message: "Registration successful" });
    }
    catch (err) {
        handle_internal_server_errors(res, err, "Internal server error occured during registration");
    }
}));
registration_router.post("/verify_email", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { otp } = req.body;
        const otp_document = yield otp_1.default.findById(otp);
        if (!user) {
            return res.status(NOT_FOUND).json({ message: "User not found" });
        }
        if (user.is_verified || user.email_verified) {
            return res.status(BAD_REQUEST).json({ message: "Email already verified" });
        }
        if (!otp_document) {
            return res.status(BAD_REQUEST).json({ message: "Invalid OTP code" });
        }
        if (otp_document.user !== user._id) {
            return res.status(BAD_REQUEST).json({ message: "Invalid OTP code" });
        }
        user.email_verified = true;
        if (user.account_verified) {
            user.is_verified = true;
        }
        yield user.save();
        const token_payload = {
            _id: user._id,
            is_verified: user.is_verified,
            email_verified: user.email_verified,
            account_verified: user.account_verified
        };
        const token = helpers_1.default.generate_user_token_from_payload(token_payload);
        if (!token) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error during registration" });
        }
        return res.header({ authorization: token }).status(OK).json({ message: "Email Verification Successful" });
    }
    catch (err) {
        handle_internal_server_errors(res, err, "Internal server error during email verification");
    }
}));
registration_router.post("/verify_account", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { firstname, lastname, username } = req.body;
        if (!user) {
            return res.status(NOT_FOUND).json({ message: "User not found" });
        }
        if (user.is_verified || user.account_verified) {
            return res.status(BAD_REQUEST).json({ message: "Account already verified" });
        }
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.account_verified = true;
        if (user.email_verified) {
            user.is_verified = true;
        }
        yield user.save();
        const token_payload = {
            _id: user._id,
            is_verified: user.is_verified,
            account_verified: user.account_verified,
            email_verified: user.email_verified
        };
        const token = helpers_1.default.generate_user_token_from_payload(token_payload);
        if (!token) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error during account verification" });
        }
        return res.header({ authorization: token }).status(OK).json({ message: "Account Verification Successful" });
    }
    catch (err) {
        handle_internal_server_errors(res, err, "Internal server error occured during registration");
    }
}));
registration_router.post("/resend_email", authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = registration_router;
