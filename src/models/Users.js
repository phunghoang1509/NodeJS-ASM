import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
},{timestamps: true, versionKey: false})

export default mongoose.model('User', userSchema)