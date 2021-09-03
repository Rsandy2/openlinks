const { getLink } = require("../api/bitly/bitlyApi");
const { fetchAmazon } = require("../api/amazon-puppeteer/amazon-pptr");
const config = require("../config.json");
const embed = require("../embeds/embed");
const ColorThief = require("colorthief");

module.exports = {
  name: "message",
  execute(message, client) {
    //Variations of channels to reference.
    const channel = client.channels.cache.get("758912395170807849");
    // const logsChannel = client.channels.cache.get("783186826735124530");
    // const adminChannel = client.channels.cache.get("807129782567305287");

    if (message.content.startsWith("https") && message.author != config.botID) {
      /* Delete message of previous link*/
      message.delete({ timeout: 1000 });

      /* Fetch New Link */
      getLink(message.content).then((res) => {
        //Returns Embeded Card.
        fetchAmazon(message.content).then((val) => {
          // console.log(val.bookImage);
          const imgThief = val.bookImage;

          ColorThief.getColor(imgThief)
            .then((color) => {
              const rgbToHex = (r, g, b) =>
                "#" +
                [r, g, b]
                  .map((x) => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                  })
                  .join("");

              let newcolor = rgbToHex(...color); // #663399

              embed.embedData["color"] = newcolor;
            })
            .catch((err) => {
              console.log(err);
            });

          embed.embedData["title"] = val.bookName;
          embed.embedData["url"] = res;
          console.log(val);
          embed.embedData["image"]["url"] = val.bookImage;
          embed.embedData[
            "description"
          ] = `Current listing price: ${val.price}`;

          channel.send({ embed: embed.embedData });
          embed.embedData["color"] = "";
        });

        console.log(embed.embedData);

        //Save for normal links.
        // channel.send(`<${res}>`);
      });
    }
  },
};
