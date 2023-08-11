import dotenv from "dotenv"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { SignInValidator, SignUpValidator } from "../validations/users";
import Users from "../models/Users";

dotenv.config();
const { SECRET_CODE} = process.env;
export const SignUp = async (req,res) => {
    try {
        const { error } = SignUpValidator.validate(req.body, {abortEarly: false});
        if(error){
            const errors = error.details.map((err)=>err.message)
            return res.status(400).json({
                message: errors,
            });
        }
        
        const userExist = await Users.findOne({email: req.body.email});
        if(userExist){
            return res.status(400).json({
                message: "Email này đã được đăng ký!"
            });
        }
        const hashPassword = await bcryptjs.hash(req.body.passWord, 10);

        const user = await Users.create({
            userName: req.body.userName,
            email: req.body.email,
            passWord: hashPassword,
        });
        user.passWord = undefined;
        return res.status(500).json({
            message: "Đăng ký thành công !",
            user
        })
    } catch (error) {
        res.status(500).json({
            name: error.name || "Lỗi",
            message: error.message || "Lỗi Server",
        })
    }
}

export const SignIn = async (req,res) => {
    try {
        const { error } = SignInValidator.validate(req.body, {abortEarly: false});
        if(error){
            const errors = error.details.map((err)=>err.message)
            return res.status(400).json({
                message: errors,
            });
        }
        
        const user = await Users.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({
                message: "Email này chưa đăng ký!, Bạn có muốn đăng ký không?"
            });
        }

        const isMatch  = await bcryptjs.compare(req.body.passWord, user.passWord)
        if(!isMatch){
            return res.status(400).json({
                message: "Pass Không đúng vui lòng kiểm tra lại!",
            })
        }
        const accessToken = jwt.sign({_id: user._id}, SECRET_CODE,{
            expiresIn: "1d",
        })
        user.passWord = undefined;
        return res.status(200).json({
            message:"Đăng nhập thành công!",
            accessToken,
            user,
        })
    } catch (error) {
       return res.status(500).json({
            message: error.message ,
        })
    }
}


