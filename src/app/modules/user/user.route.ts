import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/api/users", UserController.getAllUser);
router.get("/api/users/:userId", UserController.getSingleUser);
router.put("/api/users/:userId", UserController.updateUser);
router.put("/api/users/:userId/orders", UserController.updateOrders);
router.delete("/api/users/:userId", UserController.deleteSingleUser);

export const UserRoutes = router;
