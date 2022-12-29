import express from 'express';

export const router = express.Router();

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users';

router.get('/', getUsers);
router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);
