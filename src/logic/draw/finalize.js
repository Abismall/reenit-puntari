const { draws } = require('../../data/draw');
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

module.exports = finalizeDraw;
