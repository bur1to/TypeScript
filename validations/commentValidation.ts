import Joi from 'joi';

export const createCommentValidation = (data: any) => {
  const createValidation = Joi.object({
    userId: Joi.string().required(),
    comment: Joi.string().min(3).max(255).required()
  });

  return createValidation.validateAsync(data);
};

export const updateCommentValidation = (data: any) => {
  const updateValidation = Joi.object({
    comment: Joi.string().min(3).max(255)
  });
  
  return updateValidation.validateAsync(data);
};