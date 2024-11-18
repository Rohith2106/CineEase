import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength:8,
    },
});

export default mongoose.model("User",userSchema);