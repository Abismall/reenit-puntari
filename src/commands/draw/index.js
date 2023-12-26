const { SlashCommandBuilder } = require('discord.js');
const { draws } = require('../../data/draw');
const { createDrawButtonMenu } = require('../../logic/draw');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('draw')
    .setDescription('Draw options.'),
  async execute(interaction) {
    const drawData = {
      creator: interaction.user.id,
      users: [interaction.user.id],
    };

    const messageData = {
      content: `**Draw Session**\nCreator: <@${drawData.creator}>\nJoined: 1 user`,
      components: [createDrawButtonMenu()],
    };

    const sentMessage = await interaction.reply(messageData);
    draws.set(sentMessage.id, drawData);
  },
};
