import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import imagekit from "../lib/imagekit.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req,res)=>{
    const {fullname,email,password}=req.body
    try {
        if (password.length < 6){
            return res.status(400).json({message:'password less than 6'});
        }
        const user = await User.findOne({email})
        if (user) return res.status(400).json({message:'email already exit'})
        
        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User(
            {fullname,
            email,
            password:hashedPassword
        }
        )
        if (newUser){
            await newUser.save()

            generateToken(newUser._id,res)

            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilePic:newUser.profilePic,

            })


        }else{
            res.status(400).json({message:'invalid user data'})
        }
    } catch (error) {
        console.log('errroe', error.message)
        res.status(500).json({message:'erroeer'})
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credintial"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credintial"})
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            profilePic:newUser.profilePic,

        })
    } catch (error) {
        console.log('eroo')
        res.status(500).json({message:"error in login"})
        
    }
}


export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout successufly"})
    } catch (error) {
        console.log("eroor",error.message)
        res.status(500).json({message:"internal server error"})

    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if (!profilePic){
            return res.status(400).json({message:"profle pic is required"})
        }

        const uploadResponse = await imagekit.files.upload({
  file: profilePic.replace(/^data:image\/\w+;base64,/, ""),
  fileName: `profile-${userId}.jpg`,
});
        const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updateUser)



    } catch (error) {
        console.log("error in update profile", error)
        
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth controller", error.message)
        res.status(500).json({message: "internal server error"})
    }
}