const Discord = require('discord.js');
const { exec } = require('child_process');

module.exports = {
	name: 'forceupdate',
	description: 'forceupdate!',
	async run(message, client, args) { 
	let devRole = message.guild.roles.cache.find('861323159809687592');
        if(!message.member.roles.has(devRole)) return;
    exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    message.channel.send('Bot already up to date. No changes since last pull')
                } else {
                    client.channels.cache.get('862049598801444874').send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                    setTimeout(() => {
                        process.exit();
                    }, 1000)
                }
            }
        })
		const updateEmbed = new Discord.MessageEmbed()
		.setTitle('Update')
		.addField(`> Update` , `\`\`\`The bot is pulling an update from GitHub.\`\`\``)
		.setFooter(`${message.guild.name}` , message.author.avatarURL({ dynamic: true }))
		message.channel.send(updateEmbed);
		
		client.channels.cache.get('862049598801444874').send('Forceful GitHub Pull By Dev Team ');
	},
};
