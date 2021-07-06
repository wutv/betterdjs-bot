module.exports = async(client, message) => {

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

};
