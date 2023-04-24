import { User } from "./../user/user.model";
import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export default class TokenAuthorization {
  verifyToken = async (req: any, res: any, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.send({ message: "Token is not valid " });
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      const verify = jwt.verify(token, config.JWT_SEC!);
      req.user = verify;
      next();
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
