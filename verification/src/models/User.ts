import { Schema, model } from 'mongoose';

interface IUser {
	id: string;
}

const userSchema = new Schema<IUser>({
	id: { type: String, required: true },
});

export const User = model<IUser>('Users', userSchema);
