const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	async run(message, client, args) {
		const pingEmbed = new Discord.MessageEmbed()
		.setTitle('Pong')
        	.addField(`> WS Latency` , `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``)
		.addField(`> Bot Latency` , `\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\``)
		.setFooter(`${message.guild.name}` , message.author.avatarURL({ dynamic: true }))
		message.channel.send(pingEmbed);
	},
};
