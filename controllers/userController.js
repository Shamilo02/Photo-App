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

            const token = createToken(user._id) 
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            return res.status(200).redirect("/users/dashboard")
        }
       
        } catch (err) {
        res.status(500).send(err);
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
            const user = await User.findById({ _id: res.locals.user._id })
            .populate(["followings","followers"])


            res.render("dashboard", {
                link:"dashboard",
                user, 
                photos
            })
            }
    
    const getAllUsers = async ( req,res )=>{
                try {
                        const users  = await User.find({ _id : { $ne : res.locals.user._id} })
                        res.status(200).render("users" , {
                        users,
                        link: "users"
                        })
                        } catch (error) {
                        res.status(500).json(error)
                }}
        
        
    const getUser = async (req,res )=>{
                try {
                const user  =  await User.findById({ _id: req.params.id })
                const photos = await Photos.find({ user : user._id })
                    
               const inFollowers = user.followers.some((follower) => {
                return follower.equals(res.locals.user._id)
               })
                

                res.status(200).render("user", {
                user,
                photos, 
                inFollowers, 
                link: "users"
                })
                } catch (error) {
                res.status(500).json(error)      
                }    
        }


                const followUser = async (req,res )=>{
                try {
                let user = await  User.findOneAndUpdate({ _id: req.params.id}, 
                    { $push : { followers: res.locals.user._id}
                    },  {new: true })

                 user = await  User.findOneAndUpdate({ _id: res.locals.user._id }, 
                    { $push : { followings: req.params.id }
                    },  {new: true })
                    
                    res.status(200).redirect(`/users/${req.params.id}`)

                } catch (error) {
                res.status(500).json(error)      
                }    
                }


                const unfollowUser = async (req,res )=>{
                try {
                let user  = await  User.findOneAndUpdate({ _id: req.params.id}, 
                    { $pull : { followers: res.locals.user._id}
                    },  {new: true })

                 user = await  User.findOneAndUpdate({ _id: res.locals.user._id }, 
                    { $pull : { followings: req.params.id }
                    },  {new: true })

                    res.status(200).redirect(`/users/${req.params.id}`)

                } catch (error) {
                res.status(500).json(error)      
                }    
                }

export { createUser,
        userLogin , 
        getDashboardPage,
        getAllUsers, 
        getUser, 
        followUser, 
        unfollowUser
            }