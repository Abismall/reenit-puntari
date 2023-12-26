const {
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js');
const { draws } = require('../../data/draw');
async function joinDraw(interaction) {
  const drawData = draws.get(interaction.message.interaction.id);
  if (!drawData) return;
  const { users, creator } = drawData;
  if (!users.includes(interaction.user.id)) {
    users.push(interaction.user.id);
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
    await interaction.update({
      content: `**Draw Session**\nCreator: <@${creator}>\nJoined: ${
        users.length
      } ${users.length === 1 ? 'user' : 'users'}`,
      components: [row],
    });
  }
}

module.exports = joinDraw;
