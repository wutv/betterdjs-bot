const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = require config.prefix;
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

		   

client.once('ready', () => {
	console.log(client.user.tag + `Is Now Online! Loading ${client.channels.cache.size} cached channels, for a total of ${client.users.cache.size} users`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).run(message, client, args);
	} catch (error) {
		console.error(error);
		message.reply('Something weird happened! Please, try again!');
	}
});

client.login(config.token);
