import Photo from "../models/photoModels.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createPhoto = async ( req,res ) =>{

        const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath, 
                {
                        use_filename: true, 
                        folder: 'photos'
                }
        )

        console.log("result",result)

        fs.unlinkSync(req.files.image.tempFilePath)
                try {

                      await Photo.create({
                        ...req.body, 
                        user: res.locals.user._id, 
                        url: result.secure_url
                      })

                        res.status(200).redirect("/users/dashboard")   
                } catch (error) {
                        res.status(400).json(error.message)
                }
        }

        const getAllPhotos = async ( req,res )=>{
        try {
                const photos = res.locals.user 
                ? await Photo.find({ user : { $ne : res.locals.user._id }})
                : await Photo.find({})

                res.status(200).render("photos" , {
                photos,
                link: "photos"
                })
                } catch (error) {
                res.status(500).json(error.message)
        }}


        const getPhoto = async (req,res )=>{
        try {
        const photo =  await Photo.findById({ _id: req.params.id }).populate('user')
        res.status(200).render("photo", {
        photo,
        link: "photos"
        })
        } catch (error) {
        res.status(500).json(error.message)      
        }
                
        }



export { createPhoto , getAllPhotos , getPhoto }