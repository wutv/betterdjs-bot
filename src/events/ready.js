const { exec } = require("child_process");

module.exports = {
  name: "ready",
  once: true,
  async run(client) {
    const updateChannel = client.channels.cache.get(client.config.channels.update);
    setInterval(() => {
      exec("git pull", (error, stdout) => {
        let response = error || stdout;
        if (!error) {
          if (response.includes("Already up to date.")) {
            console.log("Bot already up to date. No changes since last pull");
          } else {
            updateChannel.send(
              "**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```" +
                response +
                "```" +
                "\n\n\n**Restarting bot**"
            );
            setTimeout(() => {
              process.exit();
            }, 1000);
          }
        }
      });
    }, 45000);
    console.log(
      `Succesfully logged in as ${client.user.tag}, with ${client.channels.cache.size} cached channels, and ${client.users.cache.size} cached users!`
    );
  },
};
