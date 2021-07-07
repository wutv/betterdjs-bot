const Discord = require('discord.js');
const {Client , MessageEmbed} = require('discord.js');


module.exports = {
	name: 'docs-threads',
	description: 'None',
	async run(message, client, args) {
     const threadsdocs = new MessageEmbed()
     .setTitle('BDJS Threads')
     .setDescription('How to Use: message.startThread(Name, Time, [reason (optional)]) \nLink: https://betterdjs.tk/docs/threads')
     message.send(threadsdocs)
	},
};

