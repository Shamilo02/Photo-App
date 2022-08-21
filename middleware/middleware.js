import jwt from "jsonwebtoken"

const authToken = async (req,res,next) => {
   
   try {
    const token = req.cookies.jwt; 
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if(err){
        res.redirect("/login")
      }else (
         next()
      )
      })
    } else {
      res.redirect("/login")
    }
    } catch (error) {
      res.status(403).json("token not found!") 
    }
 
}

export { authToken }