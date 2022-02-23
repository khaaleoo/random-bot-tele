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

const random = () => {
  const list = [
    "Leo nè",
    "anh Thuận Long An",
    "Hiếu laptop",
    "anh Quân kutoe",
    "Di Di",
    "Chị Thạnh",
    "Hạnh Darkwa'",
    "Síp Phương",
  ];
  const rndInt = Math.floor(Math.random() * list.length) + 1;
  return list[rndInt - 1];
};

// Matches "/echo [whatever]"
bot.onText(/^\/random/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, random());
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
