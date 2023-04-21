import express from "express";
import bodyParser from "body-parser";
import setRouter from "./router";

const app = express();
const dotenv = require("dotenv");
dotenv.config();

import config from "./config";

const port = 3000;
require("./database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


setRouter(app);

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
