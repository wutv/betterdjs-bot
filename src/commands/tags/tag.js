const Prompt = require("../../utils/Prompt.js");

module.exports = {
  name: "tag",
  description: "Create/delete a tag.",
  args: "Please provide a valid subcommand. \n Possible subcommands: `create`, `delete`, `source`.",
  async run(message, args) {
    const subCommand = args.shift();

    function sendMessage(title, desc, error) {
      message.channel.sendCustom(error ? "error" : "success", title, desc, {
        footer: {
          name: message.member.displayName,
          iconURL: message.author.displayAvatarURL(),
        },
      });
    }

    function checkInput(m, which, min, max) {
      if (m.content.toLowerCase() === "cancel") {
        sendMessage("Cancelled.", "Cancelled this prompt.");
        return null;  
    }
      if (m.content.length < min) {
       sendMessage(
          "Invalid Arguments.",
          `The tag's ${which} must have more than ${min} characters. Please try this command again.`
        );
        return null
      };
      if (m.content.length > max) {
        sendMessage(
          "Invalid Arguments.",
          `The tag's ${which} must have lesser than ${max} characters. Please try this command again.`
        );
        return null;
      };
      return m.content;
    }
    function provideMessage(which, type) {
      if (type === "collector")
        return `Please provide the tag ${which}. \n You have 50 seconds to provide the tag ${which}. Type cancel to \`cancel\` the command.`;
      else if (type === "arg_provided")
        return `The tag's ${which} was not provided. Please try this command again.`;
    }

    switch (subCommand.toLowerCase()) {
      case "create":
      case "make":
        let name, description, content;
        if (!args.length) {
          const collector = Prompt(message);
          sendMessage(
            "Incomplete Arguments.",
            provideMessage("name", "collector")
          );
          collector.on("collect", (m) => {
            if (!name) {
              name = checkInput(m, "name", 2, 50);
              if (!name) return collector.stop();
              name = name.toLowerCase();
              if (client.db.get(`tags.${name}`))
                return sendMessage(
                  "Invalid Arguments.",
                  "The tag name you provided already exists. Please try again."
                );
              if (client.resolveCommand(name))
                return sendMessage(
                  "Invalid Arguments.",
                  "A command with the name you provided already exists. Please try again."
                );
            }
            if (!description) {
                if (!description) return collector.stop();
              description = checkInput(m, "description", 3, 3000);
              if (description !== null) return
              sendMessage(
                "Incomplete Arguments.",
                provideMessage("description", "collector")
              );

              if (!description === null) return collector.stop();
              if (description) return;
            };

            if (!content) {
              sendMessage(
                "Incomplete Arguments.",
                provideMessage("content", "collector")
              );
              content = checkInput(m, "content", 5, 3000);
              return collector.stop();
            };
          });
          let err;
          collector.on("end", () => {
              console.log(content)
            if (name && description && content) message.reply("poggers u did it");
          });
        }
    }
  },
};
