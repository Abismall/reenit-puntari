const { draws } = require('../../data/draw');
const { createDrawButtonMenu } = require('./utils');
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

module.exports = joinDraw;
