module.exports = {
  name: "timer",
  description: "Timer!",
  execute(message, args) {
    message.channel.send(new Date().getTime()).then((sentMessage) => {
      message.delete({ timeout: 1000 });
      let countDownDate = new Date("June 6, 2021 20:00:00").getTime();
      let time = setInterval(function () {
        let currentTime = new Date().getTime();

        let distance = countDownDate - currentTime;

        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        sentMessage.edit("Fight Time: " + hours + "h " + minutes + "m");
        if (message.content === "stop") {
          message.channel.send("Stopped");
          clearInterval(time);
        }
        if (distance < 0) {
          clearInterval(time);
          message.channel.send("FIGHT TIME");
        }
      }, 5000);
    });
  },
};
