module.exports = {
  name: "guildMemberAdd",
  async run(member) {
    const general = client.channels.resolve(config.channels.welcome);
    if (!general) return;
    const welcomeEmbed = new Discord.MessageEmbed()
      .setTitle("Welcome")
      .setDescription(
        `Welcome to the server ${member} please read the [Rules](https://discord.com/channels/861167693096026122/861283938672181288) and get started [Here](https://discord.com/channels/861167693096026122/861285637919211520) we hope you have a wonderful time here`
      );
    general.send(welcomeEmbed);
  },
};
