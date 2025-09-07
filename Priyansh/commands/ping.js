module.exports.config = {
    name: "ping",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Waseem Abbasi",
    description: "Check bot is online or not",
    commandCategory: "system",
    usages: "ping",
    cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
    const timeStart = Date.now();
    return api.sendMessage("Pinging...", event.threadID, () => {
        const ping = Date.now() - timeStart;
        api.sendMessage(`Pong! 🏓\nResponse time: ${ping}ms`, event.threadID, event.messageID);
    });
};