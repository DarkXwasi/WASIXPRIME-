module.exports.config = {
  name: "test",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐖𝐀𝐒𝐈𝐗𝐏𝐑𝐈𝐌𝐄",
  description: "Check if bot commands are working",
  commandCategory: "system",
  usages: "/test",
  cooldowns: 3
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  api.sendMessage("✅ Command working perfectly!", threadID, messageID);
};