import { Schema, model, connect, Model } from "mongoose";

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: string;
  userName: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Order[];
};

export type UserMethods = {
  isUserExist(userId: string): Promise<User | null>;
};

export type UsersModel = Model<User, {}, UserMethods>;
