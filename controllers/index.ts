import { getUsers, getUser, createUser, updateUser, deleteUser } from './users';
import { getComments, getComment, createComment, updateComment, deleteComment } from './comments';
import { authorization } from './authorization';

const user = { getUsers, getUser, createUser, updateUser, deleteUser };
const comment = { getComments, getComment, createComment, updateComment, deleteComment };
const auth = { authorization };

export {
    user,
    comment,
    auth
};
