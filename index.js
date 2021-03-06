const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

const { getLink } = require("./api/bitlyApi");
const { amazon_get_link } = require("./api/amazon-puppeteer/amazon-pptr");

const embed = require("./embeds/embed");

//Verify Status
client.once("ready", () => {
  console.log("TEST!");
});

client.on("message", async (message) => {
  //If author is not OpenLinks && Channel not #Spam
  if (message.author != config.botID && message.channel.id === config.spam) {
    //Variations of channels to reference.
    const channel = client.channels.cache.get("758912395170807849");
    const logsChannel = client.channels.cache.get("783186826735124530");
    const adminChannel = client.channels.cache.get("807129782567305287");

    if (message.content === "TEST") {
      channel.send("Online");
    }
    //Filter Https links
    if (message.content.startsWith("https") && message.author != config.botID) {
      /* Delete message of previous link*/
      message.delete({ timeout: 1000 });

      /* Fetch New Link */
      getLink(message.content).then((res) => {
        //Returns Embeded Card.
        amazon_get_link(message.content).then((val) => {
          // console.log(val.bookImage);
          embed.embedData["title"] = val.bookName;
          embed.embedData["url"] = res;
          console.log(val);
          embed.embedData["image"]["url"] = val.bookImage;
          embed.embedData[
            "description"
          ] = `Current listing price: ${val.price}`;

          channel.send({ embed: embed.embedData });
        });

        console.log(res);

        //Save for normal links.
        // channel.send(`<${res}>`);
      });
    }
    let content = `timestamp: ${message.createdAt}
channel: ${message.channel}
user: ${message.author.tag}
message: "${message.content}"\n\n`;
    logsChannel.send(content);
  }
});

// login to Discord token
client.login(config.token);
