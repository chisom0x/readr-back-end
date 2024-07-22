"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const router = (0, express_1.Router)();
router.get('/:userId', user_controller_1.default.getUser);
router.get('/', user_controller_1.default.getAllUsers);
router.delete('/:userId', user_controller_1.default.deleteUser);
router.patch('/:userId', user_controller_1.default.updateUserInformation);
router.patch('/change-password/:userId', user_controller_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=user-routes.js.map