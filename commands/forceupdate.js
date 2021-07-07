const Discord = require('discord.js');
const { exec } = require('child_process');

module.exports = {
	name: 'forceupdate',
	description: 'forceupdate',
	async run(message, client, args) { 
		
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
	},
};
