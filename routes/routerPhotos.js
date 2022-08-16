import express from 'express'
const router = express.Router();
import 
{ createPhoto, getAllPhotos, getPhoto } 
from "../controllers/photoControllers.js"

router.get("/",getAllPhotos)
router.post("/",createPhoto)
router.get("/:id",getPhoto)


export default router; 
