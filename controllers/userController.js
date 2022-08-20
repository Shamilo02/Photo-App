import brcypt from "bcrypt"
import User from "../models/userModels.js"

const createUser = async (req,res) => {
    try {
           const newUser = await User.create(req.body)
           res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error.message)
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
            return res.status(200).json(user)
        }
       
        } catch (err) {
        res.status(500).send(err.message);
        }
}
export { createUser , userLogin }