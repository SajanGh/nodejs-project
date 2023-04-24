import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import * as crypto from "crypto";
import config from "../../config";

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String, require: [true, "Please provide lastname"] },
    username: {
      type: String,
      required: [true, "Please provide username"],

      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    role: {
      type: String,

      default: "user",
    },
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

// Salting and hasing password
UserSchema.pre("save", async function (next) {
  const user = this;
  const saltValue = config.SALT;
  console.log(config.SALT);
  if (!user.isModified("password")) return next();
  // const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(user.password, saltValue!, 1000, 64, `sha512`)
    .toString(`hex`);
  // user.salt = salt;
  user.password = hash;
  next();
});

export const User = mongoose.model("User", UserSchema);
