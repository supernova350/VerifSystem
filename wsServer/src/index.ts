import WebSocket from 'ws';

const server = new WebSocket.Server({
	port: 8080,
});

server.on('connection', connection => {
	console.log('connection');
	connection.on('message', message => {
		const data = message.toString();
		const {
			op,
			d: { user_id, guild_id },
		} = JSON.parse(data);

		switch (op) {
			case 0:
				console.log('Successfully verified | ', user_id, guild_id);
				break;
			case 1:
				console.log('Proxy detected | ', user_id, guild_id);
				break;
		}
	});
});
