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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        // validation using zod
        const zodParserData = user_validation_1.default.parse(user);
        const result = yield user_service_1.userServices.createUserIntoDb(zodParserData);
        const withOutPass = Object.assign(Object.assign({}, result.toObject()), { password: undefined });
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: withOutPass,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "user not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getSingleUserFromDB(userId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.deleteSingleUserFromDb(Number(userId));
        console.log("hey", result);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUserData = req.body;
        const result = yield user_service_1.userServices.updateUserFromDB(userId, updatedUserData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "User Updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const updateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUserData = req.body;
        const result = yield user_service_1.userServices.updateOrdersFromDB(userId, updatedUserData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "orders Updated successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const getSingleUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getUserOrdersFromDB(Number(userId));
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: { orders: result === null || result === void 0 ? void 0 : result.orders },
        });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const getSingleUserOrderTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getUserOrdersFromDB(Number(userId));
        const orders = result === null || result === void 0 ? void 0 : result.orders;
        let total = 0;
        if (orders) {
            for (let i = 0; i < orders.length; i++) {
                const ele = orders[i];
                total += ele.price * ele.quantity;
            }
        }
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: total.toFixed(2),
        });
        // res.status(200).json({
        //   success: true,
        //   message: "Total price calculated successfully!",
        //   data: total.toFixed(2),
        // });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
exports.UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    updateOrders,
    getSingleUserOrder,
    getSingleUserOrderTotal,
};
