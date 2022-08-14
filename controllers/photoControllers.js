import Photo from "../models/photoModels.js"

const createPhoto = ( req,res ) =>{
        const photo = Photo.create(req.body)
        res.status(200).json(photo)
}

export { createPhoto  }