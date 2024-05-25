const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./router/UserRouter");
const adminRouter = require("./router/adminRouter");

const dotenv = require("dotenv");
dotenv.config();
require("./config/config")();
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/", userRouter);
app.use("/admin" , adminRouter)

app.listen(port, () => {
  console.log("server connected successfully ");
});
