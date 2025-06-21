import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    email:{
        required:true,
        type:String
    },
    
    passwordHash:{
        required:true,
        type:String
    },

    fullName:{
        required:true,
        type:String
    },

    avatarUrl:String

},{
    timestamps:true
});


const user = mongoose.model('User', UserSchema);

export default user;