import { User } from "./user.interface";
import { UserModel } from "./user.model";
// import { UserModel } from "./user.model";

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    { userName: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findOne({ id });
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
