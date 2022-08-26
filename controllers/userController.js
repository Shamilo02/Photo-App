import brcypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModels.js"
 

    const createUser = async (req,res) => {
    try {
           await User.create(req.body)
           res.redirect("/login")
    } catch (error) {
        let _errors = { }; 
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) =>{
                _errors[key] = error.errors[key].message;
            })
        }

        console.log(_errors)
        res.status(500).json({
            succes: false,
            error
        })
    }
    }

    const userLogin = async  (req,res)=> {
    try {
        const { username, password} =req.body;
        const user = await User.findOne({ username });
        const validPassword = await brcypt.compare(
          password,
          user.password
        );
        if (!user) {
          return  res.status(403).send("user not found")
        } else if(!validPassword) {
            return  res.status(404).send("password is wrong")
        }else{ 

            const token =createToken(user._id) 
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            return res.status(200).redirect("/users/dashboard")
        }
       
        } catch (err) {
        res.status(500).send(err.message);
        }
        }

    const createToken = (userId) =>{
   return jwt.sign({userId},
     process.env.JWT_SECRET, {
        expiresIn:"1d"
   })
    }

    const getDashboardPage = (req,res ) => {
            res.render("dashboard", {
                link:"dashboard"
            })
    }
    

export { createUser , userLogin , getDashboardPage }