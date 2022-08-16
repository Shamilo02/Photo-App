import Photo from "../models/photoModels.js"

const createPhoto = async ( req,res ) =>{
        try {
                const photo =  await Photo.create(req.body)
                res.status(200).json(photo)
        } catch (error) {
                res.status(500).json(error.message)  
        }
        }

        const getAllPhotos = async ( req,res )=>{
        try {
                const photos = await Photo.find({})
                res.status(200).render("photos" , {
                photos,
                link: "photos"
                })
                } catch (error) {
                res.status(500).json(error.message)
        }}


        const getPhoto = async (req,res )=>{
        try {
        const photo =  await Photo.findById({ _id: req.params.id })
        res.status(200).render("photo", {
        photo,
        link: "photos"
        })
        } catch (error) {
        res.status(500).json(error.message)      
        }
                
        }



export { createPhoto , getAllPhotos , getPhoto }