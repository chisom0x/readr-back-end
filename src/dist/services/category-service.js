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
const category_model_1 = __importDefault(require("../models/category-model"));
class categoryService {
    static createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = yield category_model_1.default.create({
                    category: category
                });
                return newCategory;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_model_1.default.find();
                return category;
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    static getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    category: { $regex: name, $options: 'i' }
                };
                const category = yield category_model_1.default.findOne(query);
                return category;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = categoryService;
//# sourceMappingURL=category-service.js.map