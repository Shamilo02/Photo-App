import express from 'express'
const router = express.Router();
import 
{ createPhoto } 
from "../controllers/photoControllers.js"

router.route("/").post(createPhoto)

export default router; 
