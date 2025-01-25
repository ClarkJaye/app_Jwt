import userModel from "../models/userModels.js"

const users = []

export const getAllUsers = (req, res) => {
    res.json(users)
} 

 
export const createUser = async (req, res) => {
    const { userName, email, mobile, password} = req.body
    if(!userName || !email || mobile || !password){
        return res.status(400).json({success: false , message: "All fields are required"})
    }
    const user = new userModel({userName, mobile, email, password})

    try {
        const response = await registerUser(user)
        if(response.success){
            return res.status(200).json(response)
        }else{
            return res.status(400).json(response)
        }
    } catch (error) {
        return {success: false, message: "Regristration failed. Please try again later"}
    }
    
    return res.status(201).json({message: "User registered successfully", user: newUser })
}