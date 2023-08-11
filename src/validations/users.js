import Joi from "joi/lib";

export const SignUpValidator = Joi.object({
    userName: Joi.string().required().min(6).max(255),
    email: Joi.string().required().email(),
    passWord: Joi.string().required().min(6).max(255),
    confirmPassword: Joi.string().required().valid(Joi.ref("passWord")),

})

export const SignInValidator = Joi.object({
    email: Joi.string().required().email(),
    passWord: Joi.string().required().min(6).max(255),
})