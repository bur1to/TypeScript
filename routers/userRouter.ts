import express from 'express';

export const userRouter = express.Router();

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users';

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);
