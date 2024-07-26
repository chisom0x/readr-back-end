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
const books_service_1 = __importDefault(require("../services/books-service"));
const category_service_1 = __importDefault(require("../services/category-service"));
const mongoose_1 = __importDefault(require("mongoose"));
class bookController {
    static addBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, author, description, pages, cover, size, link, categories, } = req.body;
                const newBook = yield books_service_1.default.createBook({
                    title,
                    author,
                    description,
                    pages,
                    cover,
                    size,
                    link,
                    categories,
                });
                res.status(200).json({
                    status: true,
                    message: 'successful',
                    data: newBook,
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
    static bookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.bookId;
                if (!bookId)
                    return res.status(400).json({
                        status: false,
                        message: 'please provide a book id',
                        data: null,
                    });
                const book = yield books_service_1.default.getBookById(bookId);
                if (!book)
                    return res.status(400).json({
                        status: false,
                        message: 'invalid book id',
                        data: null,
                    });
                res.status(200).json({
                    status: true,
                    message: 'successful',
                    data: book,
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
    static booksByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.categoryId;
                if (!categoryId)
                    return res.status(400).json({
                        status: false,
                        message: 'please provide a category id',
                        data: null,
                    });
                const newCategoryId = new mongoose_1.default.Types.ObjectId(categoryId);
                console.log(newCategoryId);
                const books = yield books_service_1.default.getBooksByCategory(newCategoryId);
                if (!books)
                    return res.status(400).json({
                        status: false,
                        message: 'invalid category id',
                        data: null,
                    });
                res.status(200).json({
                    status: true,
                    message: 'successful',
                    data: books,
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
    static editBookInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.bookId;
                if (!bookId)
                    return res.status(400).json({
                        status: false,
                        message: 'please provide a book id',
                        data: null,
                    });
                const { title, author, pages, cover, size, link, categories } = req.body;
                const updatedBook = yield books_service_1.default.updateBook(bookId, title, author, cover, pages, size, link, categories);
                res.status(200).json({
                    status: true,
                    message: 'successful',
                    data: updatedBook,
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
    static recentlyAddedBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield books_service_1.default.getRecentlyAddedBooks();
                res.status(200).json({
                    status: true,
                    message: 'successful',
                    data: books,
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
    static deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.bookId;
                yield books_service_1.default.deleteBookById(bookId);
                res.status(200).json({
                    status: true,
                    message: 'successful',
                    data: null,
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
    static searchBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const search = req.params.search;
                if (!search)
                    return res.status(400).json({
                        status: false,
                        message: 'please provide a search query',
                        data: null,
                    });
                let result = [];
                const titleResponse = yield books_service_1.default.getBooksByTitle(search);
                if (titleResponse.length >= 1) {
                    titleResponse.map((response) => {
                        result.push(response);
                    });
                }
                const category = yield category_service_1.default.getCategoryByName(search);
                if (category) {
                    const categoryId = category._id;
                    const bookCategoryResponse = yield books_service_1.default.getBooksByCategory(categoryId);
                    if (bookCategoryResponse.length >= 1) {
                        bookCategoryResponse.map((response) => {
                            result.push(response);
                        });
                    }
                }
                const authorResponse = yield books_service_1.default.getBookByAuthor(search);
                if (authorResponse.length >= 1) {
                    authorResponse.map((response) => {
                        result.push(response);
                    });
                }
                const descriptionResponse = yield books_service_1.default.getBooksByDescription(search);
                if (descriptionResponse.length >= 1) {
                    descriptionResponse.map((response) => {
                        result.push(response);
                    });
                }
                res.json(result);
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: null });
            }
        });
    }
    static popularBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const popularBooks = yield books_service_1.default.getPopularBooks();
                return res.status(200).json({
                    status: true,
                    message: 'successful',
                    results: popularBooks.length,
                    data: popularBooks,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ status: false, message: 'something went wrong!', data: null });
            }
        });
    }
}
exports.default = bookController;
//# sourceMappingURL=book-controller.js.map