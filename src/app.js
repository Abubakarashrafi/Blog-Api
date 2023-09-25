require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const connectDB = require("./db/connection");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

app.use(express.json());
app.use("/", authRouter, userRouter);
app.use("/", blogRouter);

const run = async () => {
  try {
    await connectDB();
    console.log("database connected");
    app.listen(port, () => {
      console.log(`Server is running at ${port} `);
    });
  } catch (err) {
    console.log(err.message);
  }
};
run();
