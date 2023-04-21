import { User } from "./../user/user.model";
import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export default class TokenAuthorization {
  verifyToken = async (req: any, res: any, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.send({ message: "token is not found" });
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      const verify = await jwt.verify(token, config.JWT_SEC!);
      req.User = verify;
      console.log(req.user, "ehhdfk");
      next();
    } catch (error) {
      res.json({
        status: false,
        msg: "Error",
      });
    }
  };
}
