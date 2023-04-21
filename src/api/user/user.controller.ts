import { Request, Response } from "express";
import { User } from "./user.model";

export default class UserController {
  getSingleUser = async (req: any, res: any) => {

    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ error: "user not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  updateSingleUser = async (req: Request, res: Response) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ updateUser });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  deleteSingleUser = async (req: Request, res: Response) => {
    try {
      const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
      if (!deleteUser) {
        res.status(401).json("User not found");
      }
      res.status(200).json({ message: "User deleted Successfully!" });
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
