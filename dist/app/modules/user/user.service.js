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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
// import { UserModel } from "./user.model";
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await UserModel.create(userData);
    const user = new user_model_1.UserModel(userData);
    if (yield user.isUserExist(userData.userId)) {
        throw new Error("User already exsits");
    }
    const result = yield user.save();
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({}, { userName: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }, {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
    });
    return result;
});
const updateUserFromDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, updatedUserData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const updateOrdersFromDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, { $addToSet: { orders: updatedUserData } }, { new: true, runValidators: true });
    return result;
});
const deleteSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndDelete({ userId });
    return result;
});
const getUserOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }, { orders: 1 });
    return result;
});
exports.userServices = {
    createUserIntoDb,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteSingleUserFromDb,
    updateUserFromDB,
    updateOrdersFromDB,
    getUserOrdersFromDB,
};
