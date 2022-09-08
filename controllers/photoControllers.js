import Photo from "../models/photoModels.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createPhoto = async (req , res) =>{

        const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath, 
                {
                        use_filename: true, 
                        folder: 'photos'
                }
        )

        fs.unlinkSync(req.files.image.tempFilePath)

                try {

                      await Photo.create({
                        ...req.body, 
                        user: res.locals.user._id,
                        image_id: result.public_id,
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

                let isOwner = false; 

                if (res.locals.user) {
                      isOwner =   photo.user._id.equals(res.locals.user._id)
                }

        res.status(200).render("photo", {
        photo,
        isOwner, 
        link: "photos"
        })
        } catch (error) {
        res.status(500).json(error.message)      
        }
                
        }

const deletePhoto = async (req,res) => {
        try {
        const photo = await Photo.findById(req.params.id)
         const photoId = photo.image_id; // photonun cloudinary'den de silinmesi ucun
        
     await cloudinary.uploader.destroy(photoId)

     await Photo.findByIdAndDelete(req.params.id)

     res.status(200).redirect("/users/dashboard")
        } catch (error) {
        res.status(401).send(error) 

        }
}
const updatePhoto = async (req,res) => {
        try {
                const photo = await Photo.findById(req.params.id);

                if (req.files) {
                  const photoId = photo.image_id;
                  await cloudinary.uploader.destroy(photoId);
            
                  const result = await cloudinary.uploader.upload(
                    req.files.image.tempFilePath,
                    {
                      use_filename: true,
                      folder: 'photos',
                    }
                  );
            
                  photo.url = result.secure_url;
                  photo.image_id = result.public_id;
            
                  fs.unlinkSync(req.files.image.tempFilePath);
                }
            
                photo.title = req.body.title;
                photo.content = req.body.content;
            
                photo.save();
            
                res.status(200).redirect(`/photos/${req.params.id}`);
        
        } catch (error) {
        res.status(401).send(error) 

        }
}


export { createPhoto , getAllPhotos , getPhoto , deletePhoto , updatePhoto }