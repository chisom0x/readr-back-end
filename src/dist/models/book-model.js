"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    cover: {
        type: String,
        default: 'cover.png'
    },
    pages: {
        type: Number
    },
    size: {
        type: String
    },
    downloads: {
        type: Number,
    },
    link: {
        type: String,
        default: 'link.co'
    },
    categories: [mongoose_1.default.Types.ObjectId],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
const bookModel = mongoose_1.default.model('Book', bookSchema);
exports.default = bookModel;
//# sourceMappingURL=book-model.js.map