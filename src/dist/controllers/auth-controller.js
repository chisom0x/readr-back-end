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
exports.authController = void 0;
const user_service_1 = __importDefault(require("../services/user-service"));
const jwt_helper_1 = __importDefault(require("../utils/jwt-helper"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class authController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullName, email, password } = req.body;
                if (!fullName) {
                    return res.status(400).json({
                        status: false,
                        message: 'please enter your full name!',
                        data: [],
                    });
                }
                if (!email) {
                    return res.status(400).json({
                        status: false,
                        message: 'please enter your email!',
                        data: [],
                    });
                }
                if (!password) {
                    return res.status(400).json({
                        status: false,
                        message: 'please enter a password!',
                        data: [],
                    });
                }
                const userExists = yield user_service_1.default.emailExists(email);
                if (userExists)
                    return res
                        .status(400)
                        .json({ status: false, message: 'email already in use!', data: [] });
                const createdUser = yield user_service_1.default.createUser(fullName, email, password);
                return (0, jwt_helper_1.default)(createdUser, 200, res);
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: [] });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email) {
                    return res
                        .status(400)
                        .json({
                        status: false,
                        message: 'please enter your email!',
                        data: [],
                    });
                }
                if (!password) {
                    return res
                        .status(400)
                        .json({
                        status: false,
                        message: 'please enter a password!',
                        data: [],
                    });
                }
                const user = (yield user_service_1.default.emailExists(email));
                let userPass = !user ? 'no_user' : user.password;
                //@ts-ignore
                const pass = bcryptjs_1.default.compare(password, userPass);
                if (user && pass)
                    return (0, jwt_helper_1.default)(user, 200, res);
                return res.status(400).json({
                    status: false,
                    message: 'incorrect email or password!',
                    data: [],
                });
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: [] });
            }
        });
    }
}
exports.authController = authController;
//# sourceMappingURL=auth-controller.js.map