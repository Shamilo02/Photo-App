import express from 'express'
const router = express.Router();
import 
{   getIndex, 
    getAbout, 
    getContact, 
    getBlog, 
    getGallery, 
    getProject, 
    getServices } 
from "../controllers/pageControllers.js"

router.route("/").get(getIndex)
router.route("/about").get(getAbout)
router.route("/contact").get(getContact)
router.route("/blog").get(getBlog)
router.route("/gallery").get(getGallery)
router.route("/services").get(getServices)
router.route("/projects").get(getProject)

export default router; 