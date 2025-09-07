const fs = require("fs");
const moment = require("moment-timezone");

module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐖𝐀𝐒𝐈𝐗𝐏𝐑𝐈𝐌𝐄",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
  const tl = [
    "Or Btao Kese Ho",
    "Bohat Yaad Aari Thi Tumhari 🥺👉👈",
    "Mere sath bhi ghuma do na 🥺👉👈",
    "Acha Suno, Kaha Se Ho Aap??",
    "Mujhse Dosti Karoge?? 🥺👉👈",
    "Apka Naam Kya Hai??",
    "Mujhe Chhod ke Mt Jana 🥺",
    "I Love You 💖",
    "Mere pass baitho na 🥺👉👈",
    "Tum Bhot Mast Ho 😍",
    "Mere liye time nikaloge??",
    "Tum bht cute lagte ho 😘",
    "Kya tum mujhse pyar karoge??",
    "Kya tum single ho??",
    "Mujhse Shaadi Karogi?? 💍",
    "Ab to mil lo ek baar",
    "Dil karta hai tumhe apna bna lun",
    "Tum meri duniya ho ❤️",
    "Kabhi door mt hona",
    "Mujhe tumhari muskaan pasand hai 😘"
  ];

  var rand = tl[Math.floor(Math.random() * tl.length)];

  if (event.body) {
    let msg = event.body.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) {
      return api.sendMessage("Hello, Hi, Bye bye...", event.threadID, event.messageID);
    }

    if (msg.includes("chutiya bot")) {
      return api.sendMessage("Hmm... Tu Chutiya PhLe Ungli Kyun Ki Chomu 😾", event.threadID, event.messageID);
    }

    if (msg.includes("owner") || msg.includes("wasixprime") || msg.includes("tumhe banaya kon hai")) {
      return api.sendMessage("Mujhe 𝐖𝐀𝐒𝐈𝐗𝐏𝐑𝐈𝐌𝐄 ne banaya hai 👑", event.threadID, event.messageID);
    }

    if (msg.includes("😡")) {
      return api.sendMessage("Arre Gussa Thook Do, Smile Please 😇", event.threadID, event.messageID);
    }

    if (msg.includes("😂")) {
      return api.sendMessage("Kya baat hai, aapko hansi aa rahi hai 😅", event.threadID, event.messageID);
    }

    if (msg.includes("😭")) {
      return api.sendMessage("Rona mat yaar, main hoon na 🥺", event.threadID, event.messageID);
    }

    if (msg.includes("🤔")) {
      return api.sendMessage("Sochna band karo aur bas maza lo 😎", event.threadID, event.messageID);
    }

    if (msg.includes("❤️")) {
      return api.sendMessage("Love You Too 💖", event.threadID, event.messageID);
    }

    if (msg.includes("bot")) {
      return api.sendMessage(rand, event.threadID, event.messageID);
    }
  }
};

module.exports.run = async ({ api, event }) => {
  return api.sendMessage("Bot is running smoothly ✅", event.threadID);
};