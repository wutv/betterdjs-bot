const { Client: BaseClient, Collection, Structures } = require("discord.js"),
  { resolve, join } = require("path"),
  { Database } = require("@devsnowflake/quick.db"),
  { readdirSync } = require("fs");

function defineProperties(object, objectValues) {
  for (const [key, value] of Object.entries(objectValues)) object[key] = value;
}

module.exports = class BetterDjsClient extends BaseClient {
  constructor(options) {
    super(options);
    defineProperties(this, {
      inputOptions: options,
      commands: new Collection(),
      aliases: new Collection(),
      db: new Database(options.database.name, { path: options.database.path }),
      config: require(resolve(options.paths.config)),
      logger: require(resolve(options.paths.logger)),
    });
  }

  /**
   * Load event files.
   */

  loadEvents() {
    const events = readdirSync(resolve(this.inputOptions.paths.events)).map(
      (eventPath) =>
        require(resolve(join(this.inputOptions.paths.events, eventPath)))
    );
    for (const event of events)
      event.once
        ? super.once(event.name, (...args) => event.run(...args, client))
        : super.on(event.name, (...args) => event.run(...args, client));
  }

  /**
   * Load commands.
   */

  loadCommands() {
    const commandPath = resolve(this.inputOptions.paths.commands);

    for (const folder of readdirSync(commandPath))
      for (const cmdPath of readdirSync(join(commandPath, folder))) {
        const command = require(join(commandPath, folder, cmdPath));
        client.commands.set(command.name, command);
        command.category = folder;

        if (command.aliases)
          for (const ali of command.aliases)
            this.aliases.set(ali, command.name);
      }
  }

  /**
   * Load structures
   */

  loadStructures() {
    const structuresPath = resolve(this.inputOptions.paths.structures);
    const structures = readdirSync(structuresPath).map((path) =>
      require(join(structuresPath, path))
    );
    for (const struct of structures) {
      Structures.extend(struct.name, struct.extend);
    }
  }
  /**
   * Login to the client.
   * @param {String | undefined} token Client token.
   */

  login(token) {
    super.login(this.config.token || token);
  }
};
