import type { Request, Response } from 'express';
import { VerifyRequest } from '../models/VerifyRequest';
import WebSocketHandler from '../WebSocketHandler';

const wsHandler = new WebSocketHandler();

export default async (req: Request, res: Response): Promise<void> => {
	const { id } = req.query;

	if (id == null || typeof id !== 'string') {
		return void res.status(400).json({ err: 'Verify request ID is required' });
	}
	if (id.length !== 32) {
		return void res.status(400).json({ err: 'Verify request ID must be 32 characters' });
	}

	const verifyRequest = await VerifyRequest.findOne({ id });

	if (verifyRequest === null) {
		return void res.status(404).json({ err: 'Verify request not found or expired' });
	}

	await verifyRequest.delete();

	return void res.status(200).json({ msg: 'Successfully verified' });
};
