import express from "express";

import UserController from "./user.controller";
const router = express.Router();

const userCtrl = new UserController();

// get single user
router.get("/find/:id", userCtrl.getSingleUser);

// get all users
router.get("/", userCtrl.getAllUsers);

// update user
router.put("/:id", userCtrl.updateSingleUser);

// delete user
router.delete("/:id", userCtrl.deleteSingleUser);

export default router;
