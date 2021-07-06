const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.once('ready', () => {
	console.log(client.user.tag + `Is Now Online! Loading ${client.channels.cache.size} cached channels, for a total of ${client.users.cache.size} users`);
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
});

client.login(config.token);
