import { getUsers, getUser, createUser, updateUser, deleteUser } from './users';
import { getComments, getComment, createComment, updateComment, deleteComment } from './comments';

const user = { getUsers, getUser, createUser, updateUser, deleteUser };
const comment = { getComments, getComment, createComment, updateComment, deleteComment };

export {
    user,
    comment,
};
