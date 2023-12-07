import { User } from "./user.interface";
import { UserModel } from "./user.model";
// import { UserModel } from "./user.model";

const createUserIntoDb = async (userData: User) => {
  // const result = await UserModel.create(userData);
  const user = new UserModel(userData);
  if (await user.isUserExist(userData.userId)) {
    throw new Error("User already exsits");
  }
  const result = await user.save();
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
  const result = await UserModel.findOne(
    { userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
    }
  );
  return result;
};

const updateUserFromDB = async (
  userId: string,
  updatedUserData: User
): Promise<User | null> => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
    runValidators: true,
  });

  return result;
};
const updateOrdersFromDB = async (
  userId: string,
  updatedUserData: User
): Promise<User | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $addToSet: { orders: updatedUserData } },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteSingleUserFromDb = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

const getUserOrdersFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { orders: 1 });
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDb,
  updateUserFromDB,
  updateOrdersFromDB,
  getUserOrdersFromDB,
};
