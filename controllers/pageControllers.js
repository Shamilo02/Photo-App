const getIndex = (req,res) =>{
    res.render("index", { 
        link: "index"
    })
}

const getAbout = (req,res) =>{
    res.render("about", {
        link: "about"
    })
}
const getBlog = (req,res) =>{
    res.render("blog")
}
const getContact = (req,res) =>{
    res.render("contact")
}
const getProject = (req,res) =>{
    res.render("projects")
}
const getServices = (req,res) =>{
    res.render("services", {
        link:"services"
    })
}



export { getIndex, getAbout, getContact, getBlog, getServices, getProject }