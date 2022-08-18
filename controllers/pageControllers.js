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

const getRegister = (req,res) =>{
    res.render("register", { 
        link: "register"
    
    }
    )
}




export { getIndex, getAbout, getRegister }