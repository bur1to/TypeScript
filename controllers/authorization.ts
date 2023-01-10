import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const authorization = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const salt: string = user.salt;
    body.password = crypto.pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').toString('hex');

    if (user.password !== body.password) {
        throw new Error('Incorrect email or password');
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
