import { Schema, model } from 'mongoose';

interface IComment {
    userId: string,
    comment: string
};

const commentSchema = new Schema<IComment>({
  userId: { type: String },
  comment: { type: String, minLength: 3, maxLength: 255 }
}, {
    collection: 'comments',
    versionKey: false
});

const Comment = model('Comment', commentSchema);

export default Comment;
