import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

const authorization = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });

    if (!user) {
        throw new Error('Invalid email');
    }

    const validPass = bcrypt.compare(body.password, user.password);

    if (!validPass) {
        throw new Error('Invalid password. Try again');
    }

    const userData = {
        id: user.id,
        name: `${ user.firstName } ${ user.lastName }`
    };

    res.send(userData);
  } catch (err) {
    next(err);
  }
});

export {
    authorization
}
