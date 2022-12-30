import { userRouter } from './userRouter';
import { commentRouter } from './comment';

const comment = commentRouter
const user = userRouter;

export {
    user,
    comment,
};
