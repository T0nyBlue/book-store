const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res, next)=>{
        let {username, password} = req.body;
        try {
            var salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                username, password, salt
            })
            res.status(201).json({msg: "Create successful!"});
        } catch (error) {
            res.status(500).json({msg: "server error!"});
        }
    },

    signin: async (req, res, next) => {
        let {username, password} = req.body;
        try {
            const user = await User.findOne({username});
            if(!user){
                res.status(400).json({msg: "Username or Password is not correct!"});
            }
            if(bcrypt.compareSync(password, user.password)){
                const token = await jwt.sign({sub:user._id}, process.env.SECRET_KEY);
                res.status(200).json({msg: "signin successful!", token})
            }else{
                res.status(400).json({msg: "Username or Password is not correct!"});
            }
            
        } catch (error) {
            res.status(500).json({msg: "server error!"});
        }
    }
}