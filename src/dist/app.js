"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'https://readrbooks.netlify.app'
    ],
    optionsSuccessStatus: 200,
};
const createServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)(corsOptions));
    app.options('*', (0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.get('/', (req, res) => {
        res.json({ message: 'Hello World' });
    });
    app.use('/readr', index_1.default);
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=app.js.map