import brcypt from "bcrypt"
import jwt from "jsonwebtoken"
import Photos from "../models/photoModels.js"
import User from "../models/userModels.js"
 

    const createUser = async (req,res) => {
    try {
        const user = await User.create(req.body)
         res.status(200).json({ user: user._id})
    } catch (error) {
        let _errors = { }; 
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) =>{
                _errors[key] = error.errors[key].message;
            })
        }
        res.status(400).json(_errors)
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

    const getDashboardPage = async (req,res ) => {
            const photos = await  Photos.find({user: res.locals.user._id })
            res.render("dashboard", {
                link:"dashboard",
                photos
            })
            }
    

export { createUser , userLogin , getDashboardPage }