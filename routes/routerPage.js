import express from 'express'
const router = express.Router();
import 
{   getIndex, 
    getAbout, 
    getRegister
     } 
from "../controllers/pageControllers.js"

router.get("/", getIndex)
router.get("/about", getAbout)
router.get("/register", getRegister)


export default router; 