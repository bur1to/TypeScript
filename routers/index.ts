import { userRouter } from './userRouter';
import { commentRouter } from './comment';
import { authRouter } from './authorizationRouter';

const user = userRouter;
const comment = commentRouter
const auth = authRouter;

export {
    user,
    comment,
    auth
};
