import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

export default {
  register: async (req: any, res: any, next: any) => {
    let { username, password } = req.body;
    try {
      let salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        username,
        password,
        salt,
      });
      res.status(201).json({ msg: "Create successful!" });
    } catch (error) {
      res.status(500).json({ msg: "server error!" });
    }
  },

  signin: async (req: any, res: any, next: any) => {
    let { username, password } = req.body;
    try {
      const user: any = await User.findOne({ username });
      if (!user) {
        res.status(400).json({ msg: "Username or Password is not correct!" });
      }
      if (bcrypt.compareSync(password, user.password)) {
        const token = await jwt.sign(
          { sub: user._id },
          process.env.SECRET_KEY || ""
        );
        res.status(200).json({ msg: "signin successful!", token });
      } else {
        res.status(400).json({ msg: "Username or Password is not correct!" });
      }
    } catch (error) {
      res.status(500).json({ msg: "server error!" });
    }
  },
};
