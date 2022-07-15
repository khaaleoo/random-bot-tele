import express from "express";

const app = express();
const port = 1234;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// replace the value below with the Telegram token you receive from @BotFather
const token = "5139157367:AAHBlRR4nnj92nJbFL3LdALmeHddHGxcnY0";

const LIST = [
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
  "Quang dark",
  "Linh ơi",
  "Bảo Bảo",
  "Tùng Anh baby",
  "vợ Tùng Anh",
  "Huy xiềng xích",
  "Quang Light",
  "Hậu",
  "Quang light",
  "Merlot Wine",
  "Duy 200",
  "Hiệp"
];

const random = (listClone = []) => {
  const rndInt = Math.floor(Math.random() * listClone.length) + 1;
  const index = rndInt - 1;
  const result = listClone[index];
  listClone.splice(index, 1);
  return result;
};

const sendMessage = async (ctx, listMessage) => {
  for (let i = 0; i < listMessage.length; i++) {
    await ctx.reply(`${i + 1}. ${listMessage[i]}`);
  }
};

const randomMulti = (ctx, number, listClone, listBase) => {
  let length = +number;
  if (length > listBase.length) length = listBase.length;
  let result = [];
  while (result.length < length) {
    result.push(random(listClone));
    result = [...new Set(result)];
  }
  sendMessage(ctx, result);
  return;
};

const parseStringListNameToString = (string = "[]") => {
  const list = string.slice(1, string.length - 1).split`,`;
  return list;
};
const randomCustom = (ctx, list) => {
  if (list instanceof Array) {
    ctx.reply(random(list));
    return
  }
  const listParsed = parseStringListNameToString(list);
  ctx.reply(random(listParsed));
};

import { Telegraf } from "telegraf";
const bot2 = new Telegraf(token);

// bot 2 start

bot2.start((ctx) => ctx.reply("Welcome"));
bot2.help((ctx) => ctx.reply("Send me a sticker"));
bot2.on("sticker", (ctx) => ctx.reply("👍"));
bot2.on("message", async (ctx) => {
  const author =
    ctx.update.message.from.username || ctx.update.message.from.first_name + ctx.update.message.from.last_name;
  const message = ctx.update.message.text;
  const listClone = [...LIST];
  try {
    if (message.match(/^hello$/)) {
      ctx.reply("hello " + author);
      return;
    }

    let match = message.match(/^(\/random)( )?(-)?([0-9]+)?$/);
    if (match) {
      if (match[3]) {
        ctx.reply("Đừng có đùa tui mà");
        return;
      } else if (match[4]) {
        randomMulti(ctx, +match[4], listClone, LIST);
        randomMulti;
      } else if (match[1] === "/random") {
        ctx.reply(random(listClone));
        return;
      }
    }

    // random type: theo tên được cung cấp
    match = message.match(/^(\/random)( )(\[.+\])$/);
    if (match && match[3]) {
      randomCustom(ctx, match[3]);
      return;
    }

    match = message.match(/^(\/random)( )([0-9]+)( )(\[.+\])$/);
    if (match && match[3] && match[5]) {
      const list = parseStringListNameToString(match[5]);
      randomMulti(ctx, +match[3], list, [...list]);
      return;
    }
    return;
  } catch (e) {
    console.log(e);
  }
  // ctx.reply(random(listClone));
});
bot2.launch();
// bot 2 end

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
