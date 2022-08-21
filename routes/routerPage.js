import express from 'express'
const router = express.Router();
import 
{   getIndex, 
    getAbout, 
    getRegister,
    getLogin,
    getLogout
     } 
from "../controllers/pageControllers.js"

router.get("/",  getIndex)
router.get("/about", getAbout)
router.get("/register", getRegister)
router.get("/login", getLogin)
router.get("/logout", getLogout)


export default router; 