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
const user_service_1 = __importDefault(require("../services/user-service"));
class userController {
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                if (!userId)
                    return res
                        .status(400)
                        .json({ status: false, message: 'provide a userId!', data: null });
                const user = yield user_service_1.default.getUserById(userId);
                if (user)
                    return res
                        .status(200)
                        .json({ status: true, message: 'successful!', data: user });
                return res
                    .status(400)
                    .json({ status: false, message: 'user not found!', data: {} });
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: null });
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.getUsers();
                if (users)
                    return res
                        .status(200)
                        .json({ status: true, message: 'successful!', data: users });
                return res
                    .status(200)
                    .json({ status: true, message: 'successful!', data: null });
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: null });
            }
        });
    }
    static updateUserInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { fullName, email } = req.body;
                const updatedUser = yield user_service_1.default.updateUserById(userId, fullName, email);
                if (updatedUser === null)
                    return res
                        .status(404)
                        .json({ status: false, message: 'user not found!', data: null });
                if (updatedUser)
                    return res.status(200).json({
                        status: true,
                        message: 'user updated successfully',
                        data: updatedUser,
                    });
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: null });
            }
        });
    }
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { password } = req.body;
                const updatedUser = yield user_service_1.default.getUserById(userId);
                if (updatedUser === null) {
                    return res
                        .status(404)
                        .json({ status: false, message: 'User not found!', data: null });
                }
                updatedUser.password = password;
                yield updatedUser.save();
                return res.status(200).json({
                    status: true,
                    message: 'Password updated successfully',
                    data: updatedUser,
                });
            }
            catch (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'Something went wrong!', data: null });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const deletedUser = yield user_service_1.default.deleteUserById(userId);
                if (deletedUser === null)
                    return res
                        .status(404)
                        .json({ status: false, message: 'user not found!', data: null });
                return res
                    .status(200)
                    .json({ status: true, message: 'deletion successful', data: null });
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: null });
            }
        });
    }
}
exports.default = userController;
//# sourceMappingURL=user-controller.js.map