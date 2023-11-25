"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/api/users", user_controller_1.UserController.createUser);
router.get("/api/users", user_controller_1.UserController.getAllUser);
router.get("/api/users/:userId", user_controller_1.UserController.getSingleUser);
router.put("/api/users/:userId", user_controller_1.UserController.updateUser);
router.put("/api/users/:userId/orders", user_controller_1.UserController.updateOrders);
router.get("/api/users/:userId/orders", user_controller_1.UserController.getSingleUserOrder);
router.delete("/api/users/:userId", user_controller_1.UserController.deleteSingleUser);
exports.UserRoutes = router;
