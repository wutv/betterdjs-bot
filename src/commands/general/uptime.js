const Discord = require("discord.js");
const os = require("os");
const ms = require("ms");

module.exports = {
  name: "uptime",
  description: "Uptime!",
  async run(message, args) {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    function uptimeDate(dateInp) {
      return ((new Date().getTime - dateInp) / 1000).toString().split(".")[0];
    }
    const uptimeEmbed = new Discord.MessageEmbed()
      .setTitle("Uptime")
      .addField(
        `> System Uptime`,
        `\`\`\`<t:${uptimeDate(process.uptime())}>\`\`\``
      )
      .addField(`> Bot Uptime`, `\`\`\`${uptime}\`\`\``)
      .setFooter(
        `${message.guild.name}`,
        message.author.avatarURL({ dynamic: true })
      );
    message.channel.send(uptimeEmbed);
  },
};
