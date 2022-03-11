import TelegramBot from "node-telegram-bot-api";
import express from "express";

const app = express();
const port = 1234;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// replace the value below with the Telegram token you receive from @BotFather
const token = "5139157367:AAHBlRR4nnj92nJbFL3LdALmeHddHGxcnY0";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const list = [
  "Leo nè",
  "anh Thuận Long An",
  "Hiếu laptop",
  "anh Quân kutoe",
  "Di Di",
  "Chị Thạnh",
  "Hạnh Darkwa'",
  "Síp Phương",
  "Oanh ca ca",
  "anh Viễn",
  "Dũng cảm lên",
];

const random = () => {
  const rndInt = Math.floor(Math.random() * list.length) + 1;
  return list[rndInt - 1];
};

// Matches "/echo [whatever]"
bot.onText(/^\/random ([0-9]+)/, (msg, match) => {
  const chatId = msg.chat.id;

  try {
    if (match && match.length > 1) {
      const length = +match[1];
      const result = [];
      while ([...new Set(result)].length < length) {
        result.push(random());
      }
      result.forEach((e) => bot.sendMessage(chatId, e));
    } else {
      bot.sendMessage(chatId, random());
    }
    return;
  } catch (e) {
    bot.sendMessage(chatId, random());
  }
});

bot.onText(/^\/member/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, list.join(" "));
});

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   console.log({ msg });
//   // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
