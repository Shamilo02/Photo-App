import express from 'express'
const router = express.Router();
import 
{   getIndex, 
    getAbout, 
    getRegister,
    getLogin,
    getLogout,
    getContact,
    sendMail
     } 
from "../controllers/pageControllers.js"

router.get("/",  getIndex)
router.get("/about", getAbout)
router.get("/register", getRegister)
router.get("/login", getLogin)
router.get("/logout", getLogout)
router.get("/contact", getContact).post("/contact", sendMail)


export default router; 