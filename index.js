const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.commands = new Discord.Collection();

//Cycles through command files
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

//Cylces through event files
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

//Command Manager
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

//Event Manager
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.on("message", async (message) => {
  //If author is not OpenLinks && Channel not #Spam
  // if (message.author.bot || message.channel.id !== config.spam) return;
  // if (message.author.bot) return;
  // const prefix = "";
  // const args = message.content.slice(prefix.length).trim().split(/ +/);
  // const command = message.content.toLowerCase();
  // const command = args.shift().toLowerCase();

  // if (!client.commands.has(command)) return;

  try {
    // client.commands.get(command).execute(message, args);

    if (message.content === "Read") {
      message.channel.send("Active!");

      let collector = new Discord.MessageManager(message.channel);

      collector.fetch();
      //   let filter = (m) => {
      //     return !m.author.bot;
      //   };
      //   let counter = 0;
      //   let collector = new Discord.MessageCollector(message.channel, filter);
      //   collector.on("collect", (message, col) => {
      //     console.log("Collected Message: " + message.content);
      //     if (message.content === "CollectOff") {
      //       collector.stop();
      //     }
      //     counter++;
      //     message.channel.send("Last Collected Message: " + message.content);
      //     // message.channel.send(col);
      //     // console.log(col);
      //   });
      //   collector.on("end", (collected) => {
      //     message.channel.send("Size: " + collected.size);
      //     console.log(collected.size);
      //   });
      //   console.log("Diameter");
      //   message.channel.send("Messages active");
    }
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// let guildID = "717779939251978301";
// const getApp = (guildID) => {
//   const app = client.api.applications(client.user.id);
//   if (guildID) {
//     app.guilds(guildID);
//   }
//   return app;
// };

// client.on("ready", async () => {
//   console.log("Active!");
//   const commands = await getApp(guildID).commands.get();
//   console.log(commands);

//   await getApp(guildID).commands.post({
//     data: {
//       name: "ping",
//       description: "commands",
//     },
//   });
// });

// login to Discord token
client.login(config.token);
