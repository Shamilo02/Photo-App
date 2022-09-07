import express from 'express'
const router = express.Router();
import 
{ createPhoto, deletePhoto, getAllPhotos, getPhoto, updatePhoto } 
from "../controllers/photoControllers.js"

router.get("/",getAllPhotos)
router.post("/",createPhoto)
router.get("/:id",getPhoto)
router.delete("/:id", deletePhoto)
router.put("/:id", updatePhoto)


export default router; 
