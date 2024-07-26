"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book-controller"));
const router = (0, express_1.Router)();
router.post('/', book_controller_1.default.addBook);
router.patch('/:bookId', book_controller_1.default.editBookInfo);
router.get('/by-category/:categoryId', book_controller_1.default.booksByCategory);
router.get('/by-id/:bookId', book_controller_1.default.bookById);
router.get('/recently-added', book_controller_1.default.recentlyAddedBooks);
router.get('/popular-books', book_controller_1.default.popularBooks);
router.get('/search/:search', book_controller_1.default.searchBooks);
router.delete('/:bookId', book_controller_1.default.deleteBook);
exports.default = router;
//# sourceMappingURL=book-routes.js.map