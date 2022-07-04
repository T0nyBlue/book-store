import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import authRouter from "./routes/auth.route";
import bookRouter from "./routes/book.route";
import dotenv from "dotenv";
import passportUtil from "./utils/passport.util";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
// app.use(
//   session({
//     // secret sha256
//     secret: '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true },
//   }),
// );

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

passportUtil();

mongoose.connect(process.env.MONGO_DB || "", () => {
  console.log("mongoDB connected");
});

app.use("/api/auth", authRouter);
app.use(
  "/api/book",
  passport.authenticate("jwt", { session: false }),
  bookRouter
);

app.listen(port, () => {
  console.log(`server listening port ${port}`);
});
