"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controllers/category-controller"));
const router = (0, express_1.Router)();
router.post("/", category_controller_1.default.createCategory);
router.get("/", category_controller_1.default.allCategories);
exports.default = router;
//# sourceMappingURL=category-routes.js.map