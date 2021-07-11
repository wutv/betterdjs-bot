const Discord = require('discord.js');
const { exec } = require('child_process');
const {Client, MessageEmbed} = require('discord.js');

module.exports = {
	name: 'forceupdate',
	description: 'forceupdate',
	async run(message, client, args) { 
	
	if (!message.member.roles.cache.find(r => r.id === "861323159809687592")) return;
    exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    message.channel.send('It looks like the bot is already up to date. Have you checked <#862049598801444874>?')
                } else {
			updater = new Discord.MessageEmbed()
			.setTitle('**[FORCED UPDATE]**')
			.setDescription('New update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**" + response')
                    client.channels.cache.get('862049598801444874').send(updater + "This was forced by a staff member")
		    setTimeout(() => {
                        process.exit();
                    }, 1000)
                }
            }
        })	
	},
};
