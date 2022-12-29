import express from 'express';
export const commentRouter = express.Router();

import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/comments';

commentRouter.get('/', getComments);
commentRouter.get('/:id', getComment);

commentRouter.post('/', createComment);

commentRouter.put('/:id', updateComment);

commentRouter.delete('/:id', deleteComment);
