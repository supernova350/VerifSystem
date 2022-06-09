import WebSocket from 'ws';

export default class WebSocketHandler {
	private readonly connection: WebSocket;

	public constructor() {
		this.connection = new WebSocket('ws://localhost:8080');
		this.connection.on('open', () => console.log('hi'));
	}

	public sendProxyDetected({ user_id, guild_id }: { user_id: string; guild_id: string }): void {
		this.connection.send(
			JSON.stringify({
				op: 1,
				d: {
					user_id,
					guild_id,
				},
			})
		);
	}

	public sendSuccessfulVerify({ user_id, guild_id }: { user_id: string; guild_id: string }): void {
		this.connection.send(
			JSON.stringify({
				op: 0,
				d: {
					user_id,
					guild_id,
				},
			})
		);
	}
}
