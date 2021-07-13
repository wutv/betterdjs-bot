module.exports = {
  name: "message",
  async run(message, client) {
    const prefixes = client.config.prefixes;

    const prefix = prefixes.find((x) =>
      message.content.toLowerCase().startsWith(x)
    );

    if (!prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = client.resolveCommand(cmdName);

    if (!command) return;

    if (
      command.ownerOnly &&
      !client.config.ownerIds.includes(message.author.id)
    )
      return message.channel.sendCustom(
        "error",
        "Permission Access.",
        `Sorry, ${message.author}, but you need to be a developer to run this command.`
      );
    if (
      command.userPermissions &&
      !message.member.permissions.has(command.userPermissions)
    )
      return message.channel.sendCustom(
        "error",
        "Permission Access.",
        `Sorry, ${message.author}, but you require the permissions ${command.userPermissions
          .map((role) => `\`${role}\``)
          .join(", ")} to use this command.`,
        {
          footer: {
            name: message.member.displayName,
            iconURL: message.author.displayAvatarURL(),
          },
        }
      );

    if (command.requiredRoles) {
      function resolveRole(roleID) {
        let role = client.config.roles[roleID];
        if (!role) role = roleID;
        return roleID;
      }

      const roles = command.requiredRoles.map((role) => message.member.roles.cache.some(x => x.id === role));

      if (!roles.every(x => x === true))
        return message.channel.sendCustom(
          "error",
          "Permission Access.",
          `Sorry, ${message.author}, but you require the roles ${roles
            .map((role) => `<@&${role}>`)
            .join(", ")} to use this command.`,
          {
            footer: {
              name: message.member.displayName,
              iconURL: message.author.displayAvatarURL(),
            },
          }
        );
    }

    if (command.args && !args.length)
      return message.channel.sendCustom(
        "error",
        "Arguments Error.",
        command.args,
        {
          footer: {
            name: message.member.displayName,
            iconURL: message.author.displayAvatarURL(),
          },
        }
      );

    try {
      command.run(message, args);
    } catch (error) {
      console.error(error);
      message.reply("Something weird happened! Please, try again!");
    }
  },
};
