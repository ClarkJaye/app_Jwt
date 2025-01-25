const users = []

export const getAllUsers = (req, res) => {
    res.json(users)
} 


export const createUser = (req, res) => {
    const {name,  email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({message: "Name, email and password are required"})
    }
    const newUser = {name, email, password}
    users.push(newUser)
    
    return res.status(201).json({message: "User registered successfully", user: newUser })
}