async function errorExecutingCommand(interaction) {
  console.error(error);
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
}

module.exports = errorExecutingCommand;
