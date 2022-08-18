import User from "../models/userModels.js"


const createUser = async (req,res) => {
    try {
           const newUser = await User.create(req.body)
           res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export { createUser }