import PostModel from "../models/Post.js"




export const getAll = async(req, res) =>{
    try {
        const post = await PostModel.find().populate("user").exec();



        res.json(post);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Не удалось найти статьи!"
        })
    }
}


export const getOne = async(req, res) =>{
    try {

        const postId = req.params.id;


        const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { new: true } // 
    );

    if (!updatedPost) {
        return res.status(404).json({
            message: "Статья не найдена"
        });
    }

    res.json(updatedPost);
            
        
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Не удалось найти статьи!"
        })
    }
}

export const remove = async(req, res) =>{
    try {

        const postId = req.params.id;


        const updatedPost = await PostModel.findOneAndDelete(
        { _id: postId },
        
    );

    if (!updatedPost) {
        return res.status(404).json({
            message: "Статья не найдена"
        });
    }

    res.json({
        sucess:true
    });
            
        
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Не удалось найти статьи!"
        })
    }
}

export const create = async(req, res) =>{
    try {

        const doc = new PostModel({
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            imageUrl:req.body.imageUrl,
            user:req.userId,
        });

        const post = await doc.save();


        res.json(post)


        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Не удалось создать статью"
        })
    }
}


export const update = async (req, res) =>{
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id:postId
            },
            {
                title:req.body.title,
                text:req.body.text,
                tags:req.body.tags,
                imageUrl:req.body.imageUrl,
                user:req.userId,
            }
        );

        res.json({
            success:true
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Не удалось обновить статью"
        })
    }
}

