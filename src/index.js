const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const bookRouter = require("./routes/book.route");

const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
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

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

require('./utils/passport.util')();

mongoose.connect(process.env.MONGO_DB, ()=>{
    console.log("mongoDB connected")
})

app.use("/api/auth", authRouter);
app.use("/api/book", passport.authenticate('jwt', {session: false}), bookRouter);

app.listen(port, ()=>{
    console.log(`server listening port ${port}`)
})