import brcypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Photos from "../models/photoModels.js"
import User from "../models/userModels.js"

    const createUser = async (req,res) => {


        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath, 
            {
                    use_filename: true, 
                    folder: 'photos'
            }
    )

    fs.unlinkSync(req.files.image.tempFilePath)


    try {
        await User.create({
            ...req.body,
            url: result.secure_url, 
            image_id: result.public_id
            })

            res.status(200).redirect("/login")
        
    } catch (error) {

        res.status(400).json(error.message)
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
        res.status(401).send(err.message);
        }
        }
    const updateUser = async  (req,res )=> {
        try {

            const user = await User.findById(res.locals.user._id);

                if (req.files) {
                    const userImageId  = user.image_id; 
                  await cloudinary.uploader.destroy(userImageId);
            
                  const result = await cloudinary.uploader.upload(
                    req.files.image.tempFilePath,
                    {
                      use_filename: true,
                      folder: 'photos',
                    }
                  );
            
                  user.url = result.secure_url;
                  user.image_id = result.public_id;
            
                  fs.unlinkSync(req.files.image.tempFilePath);
                }

                 
                user.username = req.body.username;
                user.fullname = req.body.fullname;
                user.bio = req.body.bio; 


                user.save();
            
                res.status(200).redirect(`/users/dashboard`);

        } catch (error) {
            res.status(200).json(error.message)
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
        
                    const getUser = async (req,res )=> {
                                try {
                                const user  =  await User.findById({ _id: req.params.id })
                                .populate(['followers','followings'])
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
        unfollowUser,
        updateUser
            }