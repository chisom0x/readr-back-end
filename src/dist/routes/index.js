"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth-routes"));
const user_routes_1 = __importDefault(require("./user-routes"));
const category_routes_1 = __importDefault(require("./category-routes"));
const book_routes_1 = __importDefault(require("./book-routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/users", user_routes_1.default);
router.use("/category", category_routes_1.default);
router.use("/books", book_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map