import { Schema, SchemaOptions, model } from 'mongoose';

interface user {
  firstName: string,
  lastName: string,
  age: number,
  email: string,
  password: string 
};

const userSchema = new Schema<user>({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number, minLength: 1, maxLength: 120 },
    email: { type: String, unique: true },
    password: { type: String, minLength: 5, maxLength: 30 }
}, {
    collection: 'users',
    versionKey: false
} as SchemaOptions);

const User = model<user>('User', userSchema);

export default User;
