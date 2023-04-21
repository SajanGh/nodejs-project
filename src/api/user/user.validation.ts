import { z } from "zod";

const userRegisterSchema = z.object({
  firstname: z.string().min(3).max(255),
  lastname: z.string().min(2).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(5).max(255),
});

const userLoginSchema = z.object({
  email: z.string().min(3).max(255),
  // password: z.string().min(5).max(255),
});

export default { userRegisterSchema, userLoginSchema };
