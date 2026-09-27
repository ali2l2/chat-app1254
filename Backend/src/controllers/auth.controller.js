import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
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
            emai,
            password:hashedPassword
        }
        )
        if (newUser){
            generateToken(newUser._id,res)
            await newUser.save()

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

export const login = (req,res)=>{
    res.send('login router')
}


export const logout = (req,res)=>{
    res.send('logout router')
}