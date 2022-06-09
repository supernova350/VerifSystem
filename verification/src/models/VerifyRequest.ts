import { Schema, model } from 'mongoose';

interface IVerifyRequest {
	id: string;
	user_id: string;
	guild_id: string;

	expire_at: Date;
}

const verifyRequestSchema = new Schema<IVerifyRequest>({
	id: { type: String, required: true },
	user_id: { type: String, required: true },
	guild_id: { type: String, required: true },

	expire_at: { type: Date, default: Date.now, expires: 600 },
});

export const VerifyRequest = model<IVerifyRequest>('VerifyRequests', verifyRequestSchema);
