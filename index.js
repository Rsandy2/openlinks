const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  let stream = await fs.createWriteStream("Text.txt", { flags: "a" });
  let date = new Date();
  stream.write(`createdAt: ${date}\nmessage: "${message.content}"\n\n`);
  stream.end();
});

// login to Discord token
client.login(config.token);
