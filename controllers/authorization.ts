import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
const salt: string = 'ff2a533044ed72f4b6a6c29a9a174c87';

const authorization = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });

    if (!user) {
        throw new Error('Invalid email');
    }

    body.password = crypto.pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').toString('hex');

    if (user.password !== body.password) {
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
