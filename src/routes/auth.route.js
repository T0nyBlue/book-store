const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const passport = require('passport')

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get("/verify", passport.authenticate('jwt', {
    session: false
}) ,(req, res) => {
    res.send(req.user)
})

module.exports = router;