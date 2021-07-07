const Discord = require('discord.js');
const {Client , MessageEmbed} = require('discord.js');


module.exports = {
	name: 'ticket-create',
	description: 'Creates a channel/ticket',
	async run(message, client, args) {
  channel.send('Please check the channel #ticket-user.username and discuss your problem there')
  guild.channels.create('ticket-user.username', {
  type: 'text',
  permissionOverwrites: [
     {
       id: message.author.id,
       allow: ['VIEW_CHANNEL','SEND_MESSAGES','VIEW_MESSAGE_HISTORY'],
       id: guild.id,
       deny: ['VIEW_CHANNEL','SEND_MESSAGES','VIEW_MESSAGE_HISTORY'],
       id: 861285396704526387,
       allow: ['VIEW_CHANNEL','SEND_MESSAGES','VIEW_MESSAGE_HISTORY'],
    },
  ],
})

	},
};
