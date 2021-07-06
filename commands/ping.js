module.exports = {
	name: 'ping',
	description: 'Ping!',
	run async(message, client, args) {
		const { MessageEmbed } = require('discord.js')
		const bald = MessageEmbed()
		.setTitle('Pong')
        	.addField(`> WS Latency` , `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``)
		.addField(`> Bot Latency` , `\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\``)
		.setFooter(`${message.guild.name}` , message.author.avatarURL({ dynamic: true }))
		message.channel.send('Pong! ' + client.ws.ping + 'ms');
	},
};
