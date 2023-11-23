import { User } from "./user.interface";
import { UserModel } from "./user.model";
// import { UserModel } from "./user.model";

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

export const userServices = {
  createUserIntoDb,
};
