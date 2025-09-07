const { exec } = require("child_process");

module.exports.config = {
  name: "restart",
  version: "1.0.0",
  hasPermssion: 2, // Sirf bot admin
  credits: "𝐖𝐀𝐒𝐈𝐗𝐏𝐑𝐈𝐌𝐄",
  description: "Restart the bot",
  commandCategory: "system",
  usages: "/restart",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  api.sendMessage("🔄 Restarting bot...", threadID, messageID);

  setTimeout(() => {
    exec("npm restart", (err, stdout, stderr) => {
      if (err) {
        console.error("Restart error:", err);
        return api.sendMessage("❌ Failed to restart bot.", threadID, messageID);
      }
    });
  }, 2000);
};