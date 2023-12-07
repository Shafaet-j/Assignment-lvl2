import { Schema, model, connect } from "mongoose";
import { Order, User, UserMethods, UsersModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const orderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User, UsersModel, UserMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: { type: [orderSchema] },
});

userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
});

export const UserModel = model<User, UsersModel>("User", userSchema);
