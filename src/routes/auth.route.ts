import express, { Express, Request, Response } from "express";
import authController from "../controllers/auth.controller";
import passport from "passport";
const router = express.Router();

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get(
  "/verify",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.send(req.user);
  }
);

export default router;
