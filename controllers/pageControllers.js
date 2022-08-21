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
const getLogin = (req,res) =>{
    res.render("login", { 
        link: "login"
    }
    )
}

const getLogout = (req,res)=>{
    res.cookie("jwt", "", {
        maxAge: 1
    })
}



export { getIndex, getAbout, getRegister, getLogin, getLogout  }