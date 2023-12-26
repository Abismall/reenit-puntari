const { SlashCommandBuilder } = require('discord.js');
const userSubCommand = require('./user');
const serverSubCommand = require('./server');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or a server!')
    .addSubcommand(userSubCommand.data, userSubCommand.execute)
    .addSubcommand(serverSubCommand.data, serverSubCommand.execute),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();
    if (!subCommand) return;
    else
      switch (subCommand) {
        case 'user':
          await userSubCommand.execute(interaction);
          break;
        case 'server':
          await serverSubCommand.execute(interaction);
          break;
      }
  },
};
