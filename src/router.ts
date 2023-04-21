import userRouter from "./api/user/index";
import authRouter from "./api/auth/index";

export default (app: any) => {
  app.use("/api/users", userRouter);
  app.use("/api/users", authRouter);
};
