import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';


export const login =  async(req, res)=>{


    const user = await UserModel.findOne({email:req.body.email});

    if(!user){
        return res.status(404).json({
            message:"Not found"
        })
           
        
    };

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    
    if(!isValidPass){
        return res.status(404).json({
             message:"Not found pass"
        })
    }


    const token = jwt.sign({_id:user._id}, 'secret', {expiresIn:"30d"});

    const {passwordHash, ...UserData} = user._doc;



    res.json({
        ...UserData,
        token
    })


}

export const register = async(req,  res) =>{

    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.json(error.array());
    }


    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);

    const Hash = await bcrypt.hash(password, salt);

    const doc = await new UserModel({
        email:req.body.email,
        passwordHash:Hash,
        fullName:req.body.fullName,
        avatarUrl:req.body.avatarUrl

    });


    const user = await doc.save();


    const token = jwt.sign({_id:user._id}, 'secret', {expiresIn:"30d"});

    const {passwordHash, ...UserData} = user._doc;



    res.json({
        ...UserData,
        token
    })



}


export const getMe = async(req, res) =>{
        

    const user = await UserModel.findById(req.userId);

    if(!user){
        res.json({
            message:"Нет!"
        })
    }


    const {passwordHash, ...Data} = user._doc;

    res.send(Data);

    
}