module.exports = {
  name: "test",
  description: "Confirm bot status",
  execute(message) {
    message.channel.send(`Online ${message.author.tag}`);
  },
};
