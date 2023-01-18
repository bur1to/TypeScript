import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { User } from '../models/user';
import { createUserValidation, updateUserValidation }  from '../validations/userValidation';

const getUsers = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await User.find({}, {
      firstName: 1,
      lastName: 1,
      email: 1,
      age: 1
    });

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const getUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({ _id: id }, {
      firstName: 1,
      lastName: 1,
      email: 1,
      age: 1
    });

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

    const createParams = await createUserValidation(body);
    const salt: string = crypto.randomBytes(16).toString('hex');

    createParams.password = crypto.pbkdf2Sync(createParams.password, salt, 1000, 64, 'sha512').toString('hex');
    createParams.salt = salt;

    const user = await User.create(createParams);
    
    res.send(user);
   } catch (err) {
    next(err);
   }
});

const updateUser = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await updateUserValidation(body);
    
    if (body.password) {
      const salt: string = crypto.randomBytes(16).toString('hex');

      updateParams.password = crypto.pbkdf2Sync(updateParams.password, salt, 1000, 64, 'sha512').toString('hex');
      updateParams.salt = salt;
    }

    const updated = await User.findByIdAndUpdate(id, updateParams, { new: true });

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
