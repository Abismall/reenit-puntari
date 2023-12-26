const { Events } = require('discord.js');
const joinDraw = require('../logic/draw/join');
const finalizeDraw = require('../logic/draw/finalize');
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(
        interaction.commandName
      );

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content:
              'There was an error while executing this command!',
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content:
              'There was an error while executing this command!',
            ephemeral: true,
          });
        }
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === 'join_draw') {
        await joinDraw(interaction);
      } else if (interaction.customId === 'start_draw') {
        await finalizeDraw(interaction);
      }
    } else if (interaction.isStringSelectMenu()) {
      // respond to the select menu
    }
  },
};
