const Discord = require("discord.js"),
  Client = require("./src/Client.js");

// Basic client initialization.

const client = new Client({
  database: {
    name: "./src/data/db.sqlite",
    path: "./src/data",
  },
  paths: {
    config: "./config.json",
    events: "./src/events",
    structures: "./src/structures/discord.js",
    commands: "./src/commands",
    logger: "./src/structures/internal/Logger.js",
  },
  allowedMentions: { parse: ["users"] }
});
global.client = client;

function init() {
  client.loadEvents();
  client.loadCommands();
  client.loadStructures();
  client.login();
}

init();
