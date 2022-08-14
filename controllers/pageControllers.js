const getIndex = (req,res) =>{
    res.render("index")
}

const getAbout = (req,res) =>{
    res.render("about")
}
const getBlog = (req,res) =>{
    res.render("blog")
}
const getContact = (req,res) =>{
    res.render("contact")
}
const getGallery = (req,res) =>{
    res.render("gallery")
}
const getProject = (req,res) =>{
    res.render("projects")
}
const getServices = (req,res) =>{
    res.render("services")
}



export { getIndex, getAbout, getContact, getBlog, getGallery, getServices, getProject }