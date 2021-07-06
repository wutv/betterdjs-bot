const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (message.content === '!bdjs info') {
        const {Client, MessageEmbed} = require('discord.js');
        const bdjsinfoembed = new MessageEmbed()
        .setTitle('BDJS info')
        .setDescription('Hello there thanks for using BDJS')
        .addField('GitHub', 'https://github.com/betterdjs/betterdjs', true)
        .addField('Creators', 'James, DinoTheDev, A V I X I T Y, DottoArts', true)
        .addField('Repo Helpers','Xcyth, Azuz, z_t0ht, Kyle, Joey, FC', true)
        .addField('Package Name','better.djs', true)
        .addField('Version','v12.0.1', true)
        .addField('Support Server','https://discord.gg/NAxj8Qg6vz', true)
        .addField('Docs Version','v1.0.0', true)
        .addField('Website','https://betterdjs.tk/', true)
        message.channel.send(bdjsinfoembed)
           }});		   

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

//Ticket
client.on("message", message => {
    if (message.content == "!test") {
        message.channel.send("Click on the emoji below to open a ticket!")
            .then(msg => msg.react("📩")) 
    }
})


client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "📩") { 
        if (messageReaction.message.channel.id == "861908910369013770") { 
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(channel => channel.topic == `User ID: ${user.id}`)) {
                user.send("You already have a ticket opened!").catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(channel => {
                channel.setTopic(`User ID: ${user.id}`);
                channel.setParent("861908825454673941")
                let server = config.guild;
                let staffrole = server.roles.cache.find(role => role.name === "[👮] Staff");
                channel.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: staffrole,
                        allow:["VIEW_CHANNEL"]
                    }
                ])
                channel.send("Thank you for opening a ticket! How can we help you?")
            })
        }
    }
})

client.on("message", message => {
    if (message.content == "!close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("You cant use this command here");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUser = topic.slice(9);
            if (message.author.id == idUser || message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("You cant use this command here")
        }
    }

    if (message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("You cant use this command here");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUser = topic.slice(9);
            if (message.author.id == idUser || message.member.hasPermission("MANAGE_CHANNELS")) {
                var user = message.mentions.members.first();
                if (!user) {
                    message.channel.send("Invalid user");
                    return
                }

                var hasPermission = message.channel.permissionsFor(user).has("VIEW_CHANNEL", true)

                if (hasPermission) {
                    message.channel.send("This user already has access to the ticket")
                    return
                }

                message.channel.updateOverwrite(user, {
                    VIEW_CHANNEL: true
                })

                message.channel.send(`${user.toString()} has been added to the ticket`)
            }
        }
        else {
            message.channel.send("You cant use this command here!")
        }
    }
    if (message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("You cant use this command here!");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUser = topic.slice(9);
            if (message.author.id == idUser || message.member.hasPermission("MANAGE_CHANNELS")) {
                var user = message.mentions.members.first();
                if (!user) {
                    message.channel.send("This is not a valid user.");
                    return
                }

                var hasPermission = message.channel.permissionsFor(user).has("VIEW_CHANNEL", true)

                if (!hasPermission) {
                    message.channel.send("This user already have access to the ticket!")
                    return
                }

                if (user.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("You cant remove this user")
                    return
                }

                message.channel.updateOverwrite(user, {
                    VIEW_CHANNEL: false
                })

                message.channel.send(`${user.toString()} has been removed from the ticket!`)
            }
        }
        else {
            message.channel.send("You cannot use this command")
        }
    }
})

client.login(config.token);
