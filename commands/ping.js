module.exports = {
	name: 'ping',
	description: 'Ping!',
	run async(message, client, args) {
		message.channel.send('Pong! ' + client.ws.ping + 'ms');
	},
};
