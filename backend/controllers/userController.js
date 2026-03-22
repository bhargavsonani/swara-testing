import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY);
}



export const adminLogin = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if(email === adminEmail && password === adminPassword){
            const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY)
            res.json({success:true,token});
        }
        else{
            return res.status(400).json({success:false,message: "Invalid admin credentials"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: error.message});
    }   
}



