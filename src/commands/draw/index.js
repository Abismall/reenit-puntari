const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const { draws } = require('../../data/draw');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('draw')
    .setDescription('Draw options.'),
  async execute(interaction) {
    const drawData = {
      creator: interaction.user.id,
      users: [interaction.user.id],
    };
    const joinButton = new ButtonBuilder()
      .setCustomId('join_draw')
      .setLabel('Join')
      .setStyle(ButtonStyle.Primary);
    const startButton = new ButtonBuilder()
      .setCustomId('start_draw')
      .setLabel('Start Draw')
      .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder().addComponents(
      joinButton,
      startButton
    );
    const messageData = {
      content: `**Draw Session**\nCreator: <@${drawData.creator}>\nJoined: 1 user`,
      components: [row],
    };

    const sentMessage = await interaction.reply(messageData);
    draws.set(sentMessage.id, drawData);
  },
};
