import express from 'express';

import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';

import checkAuth from './utilis/checkAuth.js';

import * as UserController from '../backend/controllers/UserControllet.js'


const app = express();


const PORT = 8800;


mongoose
.connect("mongodb+srv://admin:www@cluster0.d9h5kaq.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("✅ DB connected!")
})
.catch((err) =>{
    console.log(err);
})

app.use(express.json());


app.get('/',   (req, res) =>{
    res.send("Hello");
})


app.post('/auth/login',UserController.login )


app.get("/auth/me", checkAuth,UserController.getMe )


app.post('/auth/register', registerValidation, UserController.register )



app.listen(PORT, () =>{
    console.log("✅ Server started!")
})


