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
const category_service_1 = __importDefault(require("../services/category-service"));
class categoryController {
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.body;
                const newCategory = yield category_service_1.default.createCategory(category);
                return res
                    .status(200)
                    .json({ status: true, message: 'successful!', data: newCategory });
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: null });
            }
        });
    }
    static allCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_service_1.default.getAllCategories();
                return res
                    .status(200)
                    .json({ status: true, message: 'successful!', data: categories });
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
exports.default = categoryController;
//# sourceMappingURL=category-controller.js.map