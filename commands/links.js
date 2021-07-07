const Discord = require('discord.js');
const {Client , MessageEmbed} = require('discord.js');


module.exports = {
	name: 'links',
	description: 'Returns Links assioscated with BDJS',
	async run(message, client, args) {
     const links = new MessageEmbed()
     .setTitle('BDJS Links')
     .setDescription('BetterDJS Links')
     .addField('Website','https://betterdjs.tk', true)
     .addField('Docs','https://betterdjs.tk/docs/', true)
     .addField('GitHub','https://github.com/betterdjs/better.djs', true)
     .addField('NPM','https://www.npmjs.com/package/better.djs', true)
     channel.send(links)
	},
};
