let botStatus = true; // Default ON hai

module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermssion: 2, // sirf admin/owner use kar sake
  credits: "Waseem Abbasi",
  description: "Turn bot ON/OFF",
  commandCategory: "system",
  usages: "bot on / bot off / bot status",
  cooldowns: 2,
};

module.exports.handleEvent = async function({ api, event }) {
  // Jab bot OFF hai to koi bhi command/event respond na kare (sirf owner allow)
  if (!botStatus && event.senderID !== "100091680625364") return;
};

module.exports.run = async function({ api, event, args }) {
  const ownerUID = "100091680625364"; // sirf owner control kare
  if (event.senderID !== ownerUID) {
    return api.sendMessage("❌ Sirf owner bot ON/OFF kar sakta hai!", event.threadID);
  }

  if (args[0] === "on") {
    botStatus = true;
    return api.sendMessage("✅ Bot ab ON ho gaya!", event.threadID);
  } else if (args[0] === "off") {
    botStatus = false;
    return api.sendMessage("⛔ Bot ab OFF kar diya gaya!", event.threadID);
  } else if (args[0] === "status") {
    return api.sendMessage(`📌 Bot status: ${botStatus ? "ON ✅" : "OFF ⛔"}`, event.threadID);
  } else {
    return api.sendMessage("⚠️ Usage: bot on | bot off | bot status", event.threadID);
  }
};

module.exports.isBotActive = () => botStatus;