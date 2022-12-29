import Joi from 'joi';

export const createUserValidation = (data: any) => {
    const createSchema = Joi.object({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        age: Joi.number().min(1).max(120).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{5,30}$/).required()
    });
    return createSchema.validateAsync(data);
};

export const updateUserValidation = (data: any) => {
    const updateSchema = Joi.object({
        firstName: Joi.string().min(2).max(255),
        lastName: Joi.string().min(2).max(255),
        age: Joi.number().min(1).max(120),
        email: Joi.string().email(),
        password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{5,30}$/)
    });
    return updateSchema.validateAsync(data);
};

