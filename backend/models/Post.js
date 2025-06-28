import mongoose from "mongoose";


const PostSchema = mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    
    text:{
        required:true,
        type:String
    },

    tags:{
        
        type:Array,
        default:[]
    },

    viewsCount:{
        type:Number,
        default:0
    },

    imageUrl:String,
    user:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

},{
    timestamps:true
});


const Post = mongoose.model('Post', PostSchema);

export default Post;