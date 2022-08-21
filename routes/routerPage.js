import express from 'express'
const router = express.Router();
import { authToken } from '../middleware/middleware.js';
import 
{   getIndex, 
    getAbout, 
    getRegister,
    getLogin
     } 
from "../controllers/pageControllers.js"

router.get("/",  getIndex)
router.get("/about", getAbout)
router.get("/register", getRegister)
router.get("/login", getLogin)


export default router; 