const Discord = require('discord.js');
const execSync = require('child_process').execSync;
const ms = require('ms');
const fs = require('fs');
const auth = require('../auth.json');

module.exports = {
    name: 'eval',
    description: 'Eval',
    async run(message, arguments, text, client) {
        let args = message.content.split(' ').slice(1);
        let cont = message.content.split(' ').slice(1).join(' ');

        if (message.channel.id !== '861698467939614750') {
            message.channel.send('Evaluating....').then(msg => {
                let errorcodefake = new Discord.MessageEmbed()
                    .setAuthor(`Eval by ${message.author.tag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
                    .setDescription(`**:inbox_tray: Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                    .addField(`\u200b`, `**:outbox_tray: Output:**\`\`\`js\nSyntaxError: Unexpected identifier \nat /root/Xcyth-Bot/commands/owner/eval.js:35:31 \nat runMicrotasks (<anonymous>) \nat processTicksAndRejections (internal/process/task_queues.js:93:5)\`\`\``, true)
                    .setColor(0xFF0000)
                    .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} `);
                msg.edit({
                    embed: errorcodefake
                })
            })
        } else {

            function clean(text) {
                if (typeof text !== 'string')
                    text = require('util').inspect(text, {
                        depth: 0
                    })
                let rege = new RegExp(auth.token, "gi");
                let rege2 = new RegExp("9 + 10", "gi");
                let rege3 = new RegExp("forEach", "gi");
                text = text
                    .replace(/`/g, '`' + String.fromCharCode(8203))
                    .replace(/@/g, '@' + String.fromCharCode(8203))
                    .replace(rege, 'sike you thought')
                    .replace(rege2, '21')
                    .replace(rege3, '69420')
                return text;
            };
            message.channel.send('Evaluating...').then(msg => {
                try {
                    let code = args.join(' ');
                    let evaled = eval(`${code}`);

                    if (typeof evaled !== 'string') {
                        evaled = require('util').inspect(evaled);
                    }
                    if (evaled.length > 2000) {
                        try {
                            let evalcode1 = new Discord.MessageEmbed()
                                .setAuthor(`Eval by ${message.author.tag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
                                .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                                .addField(`\u200b`, `**Output:**\n\n\`\`\`Output too long, logged to eval.txt`, true)
                                .setColor(0x00FF00)
                                .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`);
                            msg.edit({
                                embed: evalcode1
                            }), fs.writeFile(`eval.txt`, `${clean(evaled)}`), message.channel.send("Eval output", {
                                files: ["eval.txt"]
                            });
                            return fs.writeFile(`eval.txt`, `${clean(evaled)}`);
                        } catch (err) {
                            let errorcode1 = new Discord.MessageEmbed()
                                .setAuthor(`Eval by ${message.author.tag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
                                .setDescription(`**Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                                .addField(`\u200b`, `**Output:**\n\n\`\`\`js\nOutput too long, logged to ${__dirname}\\eval.txt\`\`\``, true)
                                .setColor(0xFF0000)
                                .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms `, `https://images-ext-2.discordapp.net/eyJ1cmwiOiJodHRwczovL2Euc2FmZS5tb2UvVUJFVWwucG5nIn0.LbWCXwiUul3udoS7s20IJYW8xus`);
                            msg.edit({
                                embed: errorcode1
                            });
                            return fs.writeFile(`eval.txt`, `${clean(err)}`);
                        }
                    }
                    let evalcode = new Discord.MessageEmbed()
                        .setAuthor(`Eval by ${message.author.tag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
                        .setDescription(`**:inbox_tray: Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                        .addField(`\u200b`, `**:outbox_tray: Output:**\n\n\`\`\`js\n${clean(evaled)}\`\`\``, true)
                        .setColor(0x00FF00)
                        .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} ms`);
                    msg.edit({
                        embed: evalcode
                    }).catch(e => console.log(e));
                } catch (err) {
                    let errorcode = new Discord.MessageEmbed()
                        .setAuthor(`Eval by ${message.author.tag}`, `https://cdn.discordapp.com/emojis/314405560701419520.png`)
                        .setDescription(`**:inbox_tray: Input:**\n\n\`\`\`js\n${cont}\`\`\``, true)
                        .addField(`\u200b`, `**:outbox_tray: Output:**\`\`\`js\n${clean(err)}\`\`\``, true)
                        .setColor(0xFF0000)
                        .setFooter(`Node.js - Time taken: ${Date.now() - message.createdTimestamp} `);
                    msg.edit({
                        embed: errorcode
                    }).catch(e => logger.error(e));
                }
            });
        }
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['861284348505096232'],
}
