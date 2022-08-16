import express from 'express'
const router = express.Router();
import 
{   getIndex, 
    getAbout, 
    getContact, 
    getBlog, 
    getProject, 
    getServices } 
from "../controllers/pageControllers.js"

router.get("/", getIndex)
router.get("/about", getAbout)
router.get("/contact", getContact)
router.get("/blog", getBlog)
router.get("/services", getServices)
router.get("/projects", getProject)

export default router; 