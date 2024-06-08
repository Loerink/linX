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
const axios_1 = __importDefault(require("axios"));
const parsed_config_file_1 = __importDefault(require("../parsed-config-file"));
class Notification_Service {
    static send_otp_email(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification_service_ip = parsed_config_file_1.default.service_configs.notification_service_socket_address[0];
            const notification_service_port = parsed_config_file_1.default.service_configs.notification_service_socket_address[1];
            try {
                const res = yield axios_1.default.post(`http://${notification_service_ip}:${notification_service_port}/send_otp`, { email, otp });
                if (res.status >= 400) {
                    return false;
                }
                else
                    return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
}
exports.default = Notification_Service;
