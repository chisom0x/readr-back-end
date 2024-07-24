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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
class LoggedInUser {
    static getLoggedInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token;
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith('Bearer')) {
                    token = req.headers.authorization.split(' ')[1];
                }
                else if (req.cookies.jwt) {
                    token = req.cookies.jwt;
                }
                if (!token) {
                    return 'not-logged-in';
                }
                //@ts-ignore
                const decoded = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, 
                //@ts-ignore
                process.env.JWT_SECRET);
                //@ts-ignore
                const userId = decoded.id;
                return userId;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = LoggedInUser;
//# sourceMappingURL=logged-in-user.js.map