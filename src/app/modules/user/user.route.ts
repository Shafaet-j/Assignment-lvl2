import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/api/users", UserController.getAllUser);
router.get("/api/users/:userId", UserController.getSingleUser);

export const UserRoutes = router;
