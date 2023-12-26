const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
function createDrawButtonMenu() {
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
  return row;
}

module.exports = { createDrawButtonMenu };
