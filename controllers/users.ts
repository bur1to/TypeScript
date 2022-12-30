import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { createUserValidation, updateUserValidation }  from '../validations/userValidation';

const getUsers = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await User.find();

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const getUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({ _id: id });

    if (!data) {
        throw new Error('User does not exist');
    }

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const createUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    if (!body) {
        throw new Error('Body required');
    }

    const value = await createUserValidation(body);

    const user = await User.create(value);
    
    res.send(user);
   } catch (err) {
    next(err);
   }
});

const updateUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const value = await updateUserValidation(body);

    const updated = await User.findByIdAndUpdate(id, value, { new: true });

    res.send(updated);
  } catch (err) {
    next(err);
  }
});

const deleteUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deleted = await User.deleteOne({ _id: id });

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
