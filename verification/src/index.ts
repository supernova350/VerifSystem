import 'dotenv/config';

import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import verifyController from './controllers/verify.controller';
import rateLimit from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get('/verify', verifyController);

app.listen(3000, async () => {
	console.log('Listening on port 3000');

	mongoose.connection.on('connected', () => {
		console.log('connected');
	});

	if (process.env.ATLAS_URI === undefined) {
		throw new Error('process.env.ATLAS_URI is undefined');
	}

	await mongoose.connect(process.env.ATLAS_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions);
});
