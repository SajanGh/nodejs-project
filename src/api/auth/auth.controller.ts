import { NextFunction, Request, Response } from "express";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
import config from "../../config";

export default class AuthController {
  // REGISTRATION
  userRegistration = async (req: Request, res: Response) => {
    const newUser = new User(req.body);

    try {
      const savedUser = await newUser.save();

      if (!newUser) {
        res.status(401).json("Registration please ");
      }
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json({err,message:"Please provide another email and username"});
    }
  };

  //LOGIN

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        res.status(401).json("User not found on login");
      } else {
        const jwtSecret = process.env.JWT_SEC;
        if (!jwtSecret) {
          throw new Error("JWT secret is not defined");
        }
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          jwtSecret,
          {
            expiresIn: "30d",
          }
        );
        res.status(200).json({ user, token });
        // console.log("<--------Encrypted password---->", user.password);
        const saltSecret = config.SALT;

        //>>>>>>>>
        const hashedpassword = crypto
          .pbkdf2Sync(password, saltSecret, 1000, 64, "sha512")
          .toString("hex");

        // console.log("<---------Hashed Password---->", hashedpassword);

        if (user.password !== hashedpassword) {
          return res.status(401).send("Invalid email or password");
        } else {
          return next();
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
