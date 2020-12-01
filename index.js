const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const { getLink } = require("./api/bitlyApi");

//Verify Status
client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  //If author is not OpenLinks && Channel not #Spam
  if (message.author != config.botID && message.channel.id === config.spam) {
    const channel = client.channels.cache.get("758912395170807849");
    const logsChannel = client.channels.cache.get("783186826735124530");
    let stream = await fs.createWriteStream("logs.txt", { flags: "a" });

    //Log content.
    let content = `timestamp: ${message.createdAt}\nchannel: ${message.channel}\nmessage: "${message.content}"\n\n`;

    stream.write(content);
    stream.end();

    //Filter Https links
    if (message.content.startsWith("https")) {
      getLink(message.content).then((res) => {
        channel.send(`<${res}>`);
      });
    } else {
      logsChannel.send(content);
    }
  }
});

// login to Discord token
client.login(config.token);
