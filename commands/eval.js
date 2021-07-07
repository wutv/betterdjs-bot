const Discord = require('discord.js');
const execSync = require('child_process').execSync;
const ms = require('ms');
const fs = require('fs');
const { stripIndents } = require('common-tags');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: 'none',
    async run(message, arguments, text, client) => {
    if(message.member?.roles.cache.has('861284466785517589')) {
          try {
            const evaled = eval(command, { depth: 0 });
            const embed = new MessageEmbed()
                .setTitle('Sucessfully Executed')
                .setColor(0x57F287)
                .addField('📥 Input', stripIndents`
                    \`\`\`js
                    ${command}
                    \`\`\`
                `)
                .addField('📤 Output', stripIndents`
                    \`\`\`js
                    ${inspect(evaled, { depth: 0 })}
                    \`\`\`
                `)
                .setFooter(`Time Taken: ${Date.now() - msg.createdTimestamp}ms`);
            return msg.channel.send({ embeds: [embed] });
        } catch (error) {
            const EEmbed = new MessageEmbed()
                .setTitle('An Error Ocurred')
                .setColor(0xED4245)
                .addField('📥 Input', stripIndents`
                    \`\`\`js
                    ${command}
                    \`\`\`
                `)
                .addField('📤 Output', stripIndents`
                    \`\`\`js
                    ${error}
                    \`\`\`
                `)
                .setFooter(`Time Taken: ${Date.now() - msg.createdTimestamp}ms`);
            return msg.channel.send({ embeds: [EEmbed] });
        }
    }
}
}
