import { Request, Response, NextFunction } from 'express';
import Comment from "../models/comment";
import { createCommentValidation, updateCommentValidation } from "../validations/commentValidation";

const getComments = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Comment.find();

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const getComment = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const data = await Comment.findOne({ _id: id });

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const createComment = (async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const { body } = req;

    if (!body) {
      throw new Error('Body required');
    }

    const value = await createCommentValidation(body);
    const user = await Comment.create(value);

    res.send(user);
  } catch (err) {
    next(err);
  }
});

const updateComment = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const value = await updateCommentValidation(body);
    const updated = await Comment.findByIdAndUpdate(id, value, { new: true });

    res.send(updated);
  } catch (err) {
    next(err);
  }
});

const deleteComment = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deleted = await Comment.deleteOne({ _id: id });

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

export {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
};
