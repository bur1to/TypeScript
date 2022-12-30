import express from 'express';

import {
    authorization
} from '../controllers/authorization';

const authRouter = express.Router();

authRouter.post('/', authorization);

export {
    authRouter
}
