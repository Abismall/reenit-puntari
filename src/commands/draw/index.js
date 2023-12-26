const { SlashCommandBuilder } = require('discord.js');
const { draws } = require('../../data/draw');
const { createDrawButtonMenu } = require('../../logic/draw');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('draw')
    .setDescription('Draw options.'),
  async execute(interaction) {
    const msg = await interaction.reply({
      content: `**Draw Session**\nCreator: <@${interaction.user.id}>\nJoined: 1 user`,
      components: [createDrawButtonMenu()],
    });
    draws.set(msg.id, {
      creator: interaction.user.id,
      users: [interaction.user.id],
    });
  },
};
