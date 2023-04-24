import express from "express";
const router = express.Router();

import { validateRequestBody } from "../../@guard/validation.guard";

import userValidation from "../user/user.validation";
import AuthController from "./auth.controller";
import TokenAuthorization from "./token.auth";

const authCtrl = new AuthController();
const tokenVerify = new TokenAuthorization();

// Register
router.post(
  "/register",
  validateRequestBody(userValidation.userRegisterSchema),
  authCtrl.userRegistration
);

// Login
router.post(
  "/login",
  validateRequestBody(userValidation.userLoginSchema),
  tokenVerify.verifyToken,
  authCtrl.userLogin
);

export default router;
