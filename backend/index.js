import express from 'express';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import checkAuth from './utilis/checkAuth.js';

import * as UserController from '../backend/controllers/UserControllet.js'
import * as PostController from '../backend/controllers/PostController.js'
import multer from 'multer';



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


const storage = multer.diskStorage({
    destination:(_, __, cb) =>{
        cb(null, 'uploads');
    },

    filename:(_, filename, cb) =>{
        cb(null, filename.originalname);
    },
});

const upload = multer({storage});

app.use('/uploads', express.static('uploads'))


app.get('/',   (req, res) =>{
    res.send("Hello");
})


app.post('/auth/login',loginValidation, UserController.login )
app.get("/auth/me", checkAuth, UserController.getMe )
app.post('/auth/register', registerValidation, UserController.register )
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.post('/uploads', checkAuth,  upload.single('image'), (req, res) =>{
    res.json({
        url:`/uploads/${req.file.originalname}`,
        
    })
})


app.listen(PORT, () =>{
    console.log("✅ Server started!")
})


