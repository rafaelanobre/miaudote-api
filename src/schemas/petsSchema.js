import Joi from "joi";

export const newPetSchema = Joi.object({
    name: Joi.string().required(),
    photo:  Joi.string().uri().required(),
    category:  Joi.string().valid("1", "2").required(),
    description:  Joi.string().required(),
    characteristics:  Joi.string().required(),
    cep: Joi.string().length(8).pattern(/^\d{8}$/).required(),
    city:  Joi.string().required(),
    state: Joi.string().length(2).required(),
})