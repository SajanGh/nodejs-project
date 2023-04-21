import * as mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();
// Database connection
mongoose.set("strictQuery", true);
mongoose
  // @ts-ignore
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connection successfull"))
  .catch((error) => {
    console.log(error);
  });
