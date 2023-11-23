import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/api/users", UserController.getAllUser);

export const UserRoutes = router;
