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
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateUserFromDB = async (
  userId: string,
  updatedUserData: User
): Promise<User | null> => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData);

  return result;
};

const deleteSingleUserFromDb = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDb,
  updateUserFromDB,
};
