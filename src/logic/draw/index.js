const { draws } = require('../../data/draw');
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

async function finalizeDraw(interaction) {
  const drawData = draws.get(interaction.message.interaction.id);
  if (!drawData) return;
  const { users, creator } = drawData;
  if (interaction.user.id !== creator) return;
  const winnerId = users[Math.floor(Math.random() * users.length)];
  await interaction.update({
    content: `**Draw Session**\nCreator: <@${creator}>\nWinner: <@${winnerId}>`,
    components: [],
  });
  draws.delete(interaction.message.id);
}
async function joinDraw(interaction) {
  const drawData = draws.get(interaction.message.interaction.id);
  if (!drawData) return;
  const { users, creator } = drawData;
  if (!users.includes(interaction.user.id)) {
    users.push(interaction.user.id);

    await interaction.update({
      content: `**Draw Session**\nCreator: <@${creator}>\nJoined: ${
        users.length
      } ${users.length === 1 ? 'user' : 'users'}`,
      components: [createDrawButtonMenu()],
    });
  }
}

module.exports = { joinDraw, finalizeDraw, createDrawButtonMenu };
