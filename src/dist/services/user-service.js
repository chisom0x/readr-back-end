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
const user_model_1 = __importDefault(require("../models/user-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class userService {
    static createUser(fullName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_model_1.default.create({
                    fullName: fullName,
                    email: email,
                    password: password,
                });
                return newUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email: email });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static checkPassword(password, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield bcryptjs_1.default.compare(password, hashPassword);
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(userId);
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.find();
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_model_1.default.findByIdAndDelete(userId);
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateUserById(userId, name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findByIdAndUpdate(userId, {
                    fullName: name,
                    email: email,
                }, { new: true });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = userService;
//# sourceMappingURL=user-service.js.map