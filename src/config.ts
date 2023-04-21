import * as dotenv from "dotenv";
dotenv.config();

export default {
  SALT: process.env.SALT,
  PASS_SEC: process.env.PASS_SEC,
  JWT_SEC: process.env.JWT_SEC,
};

// const ENV_VARS = dotenv.config();
// export default (env) => {
//   const envVars = {
//       SECRET_KEY: process.env.SECRET_KEY,
//       abc: 'abc 123'
//   }
//   return envVars;
// }
