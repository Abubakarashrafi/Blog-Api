const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const UserData = require("../model/user");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (username && email && password) {
      const user = await UserData.findOne({ $or: [{ username }, { email }] });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const register = await UserData.create({
          username,
          email,
          password: hashPass,
        });
        await register.save();
        res.status(200).json({ msg: "Registration succesfull", register });
      } else {
        res.status(401).json("User already exist");
      }
    } else {
      res.status(401).json("All fields required");
    }
  } catch (err) {
    console.log(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  if ((username || email) && password) {
    const user = await UserData.findOne({ $or: [{ email }, { username }] });
    if (user) {
      const match = await bcrypt.compare(password, user.password);

      // console.log(match);
      if (match) {
        const jwtToken = jwt.sign(
          {
            id: user.id,
            isAdmin : user.isAdmin
          },
          process.env.SECRET_KEY
        );
        const { password, ...others } = user._doc;
        // console.log(user.id);
        res.status(200).json({ auth: jwtToken, user: others });
      } else {
        res.status(403).json("Invalid password");
      }
    } else {
      res.status(403).json("Invalid Email or Username");
    }
  } else {
    res.status(403).json("All fields required");
  }
});

module.exports = authRouter;
