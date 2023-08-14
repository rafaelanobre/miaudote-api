import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    photo: Joi.string().uri().allow(''),
    cpf: Joi.string().length(11).pattern(/^\d{11}$/).required(),
    cellphone: Joi.string().min(10).max(11).pattern(/^\d{10,11}$/).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});