import jwt from "jsonwebtoken"
import User from "../models/userModels.js";

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt; 

    if (token) {
       jwt.verify(token, process.env.JWT_SECRET , async (err, decodedToken) =>{
        if (err) {
            res.locals.user = null;
            next();
        } else {
          const user = await User.findById(decodedToken.userId); 
          res.locals.user = user; 
          next();
        }
       })
    } else {
      res.locals.user = null; 
      next();
    }

}


const authToken = async (req,res,next) => {
   
   try {
    const token = req.cookies.jwt; 
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if(err){
        res.redirect("/login")
      }else (
         next()
      )
      })
    } else {
      res.redirect("/login")
    }
    } catch (error) {
      res.status(403).json("token not found!") 
    }
 
}

export { authToken, checkUser }