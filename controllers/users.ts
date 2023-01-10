import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { User } from '../models/user';
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
        throw new Error('User not found');
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
    const salt: string = crypto.randomBytes(16).toString('hex');

    value.password = crypto.pbkdf2Sync(value.password, salt, 1000, 64, 'sha512').toString('hex');
    value.salt = salt;

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
    const salt: string = crypto.randomBytes(16).toString('hex');

    value.password = crypto.pbkdf2Sync(value.password, salt, 1000, 64, 'sha513').toString('hex');

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
