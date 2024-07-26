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
const book_model_1 = __importDefault(require("../models/book-model"));
const mongoose_1 = __importDefault(require("mongoose"));
class bookService {
    static createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = yield book_model_1.default.create(bookData);
                return newBook;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getBooksBySearch(searchParam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isObjectId = mongoose_1.default.Types.ObjectId.isValid(searchParam);
                let query;
                if (isObjectId) {
                    query = { categories: searchParam };
                }
                else {
                    query = {
                        $or: [
                            { title: { $regex: searchParam, $options: 'i' } },
                            { author: { $regex: searchParam, $options: 'i' } },
                        ],
                    };
                }
                const books = yield book_model_1.default.find(query);
                return books;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_model_1.default.findById(bookId);
                return book;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateBook(bookId, title, author, cover, pages, size, link, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_model_1.default.findByIdAndUpdate(bookId, {
                    title: title,
                    author: author,
                    cover: cover,
                    pages: pages,
                    size: size,
                    link: link,
                    categories: categories,
                }, { new: true });
                return book;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getBooksByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield book_model_1.default.find({ categories: categoryId });
                return books;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getBooksByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    title: { $regex: title, $options: 'i' }
                };
                const book = yield book_model_1.default.find(query);
                return book;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getBookByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    author: { $regex: author, $options: 'i' }
                };
                const book = yield book_model_1.default.find(query);
                return book;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getBooksByDescription(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    description: { $regex: keyword, $options: 'i' } // Case-insensitive search
                };
                const books = yield book_model_1.default.find(query);
                return books;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getRecentlyAddedBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recentBooks = yield book_model_1.default
                    .find()
                    .sort({ createdAt: -1 })
                    .limit(1);
                return recentBooks;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getPopularBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const popularBooks = yield book_model_1.default.find().limit(6);
                return popularBooks;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getWebDevBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const webDevBooks = yield book_model_1.default.find().limit(6);
                return webDevBooks;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_model_1.default.findByIdAndDelete(bookId);
                return book;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = bookService;
//# sourceMappingURL=books-service.js.map