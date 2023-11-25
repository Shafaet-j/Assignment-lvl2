import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    // validation using zod
    const zodParserData = userValidationSchema.parse(user);

    const result = await userServices.createUserIntoDb(zodParserData);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "user not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(userId);
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
  } catch (error) {
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
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;
    const result = await userServices.updateUserFromDB(userId, updatedUserData);
    res.status(200).json({
      success: true,
      message: "User Updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const updateOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;
    const result = await userServices.updateOrdersFromDB(
      userId,
      updatedUserData
    );
    res.status(200).json({
      success: true,
      message: "orders Updated successfully!",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const getSingleUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getUserOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: "order fetched successfully!",
      data: result,
    });
  } catch (error) {
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
};
const getSingleUserOrderTotal = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getUserOrdersFromDB(userId);
    const orders = result?.orders;
    let total = 0;
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        const ele = orders[i];
        total += ele.price * ele.quantity;
      }
    }
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: total.toFixed(2),
    });
  } catch (error) {
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
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  updateOrders,
  getSingleUserOrder,
  getSingleUserOrderTotal,
};
