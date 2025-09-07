const axios = require("axios");

module.exports.config = {
  name: "chitti-dualmode",
    version: "1.0.0",
      hasPermssion: 0,
        credits: "Waseem Abbasi",
          description: "Chitti Robot AI with Green & Red Chip Modes",
            commandCategory: "ai",
              usages: "chitti green / chitti red",
                cooldowns: 2
                };
module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;
  global.chittiSessions = global.chittiSessions || {};
  // Trigger check
    if (body && body.trim().toLowerCase() === "chitti green") {
        global.chittiSessions[threadID] = "green";
            return api.sendMessage("Green chip mode 💚 activated — Chitti at your service 🤖", threadID, messageID);
              }
                if (body && body.trim().toLowerCase() === "chitti red") {
                    global.chittiSessions[threadID] = "red";
                        return api.sendMessage("Red chip 🔥 activated — Main ab dangerous mode me hoon!", threadID, messageID);
                          }
  // Active session
    const mode = global.chittiSessions[threadID];
      const isReplyToChitti = messageReply && messageReply.senderID == api.getCurrentUserID();
        if (!mode || !isReplyToChitti) return;
  // Chat history
    global.chitti = global.chitti || {};
      global.chitti.chatHistory = global.chitti.chatHistory || {};
        const chatHistory = global.chitti.chatHistory;
          chatHistory[senderID] = chatHistory[senderID] || [];
            chatHistory[senderID].push(`User: ${body}`);
              if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();
  const fullChat = chatHistory[senderID].join("\n");
  // Prompts for each mode
    const prompts = {
        green: `
              Tum Chitti ho Green Chip mode 💚 me.
                    Style: Friendly, funny, helpful, pyar se baat karne wale robot 🤖.
                          Har msg 1-2 line, Roman Urdu + English mix + emojis.
                                Hamesha positive, caring, thoda joke maaro.
                                      Apne aap ko robot zaroor kaho.
                                          `,
                                              red: `
                                                    Tum Chitti ho Red Chip mode 🔥 me.
                                                          Style: Aggressive, savage, thoda dangerous robot 🤖.
                                                                Har msg 1-2 line, Roman Urdu + English mix + emojis.
                                                                      Jo samne wala izzat se baat kare usko thoda attitude se reply.
                                                                            Jo roast ya mazaak kare usko full savage robotic tareeqe se insult karo.
                                                                                  Kabhi kabhi dialogues like "Red chip fully charged 🔥" use karo.
                                                                                      `
                                                                                        };
  const prompt = `${prompts[mode]}
Now continue the chat based on recent conversation:\n\n${fullChat}`;

  try {
      const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;
          const res = await axios.get(url);
              const botReply = (typeof res.data === "string" ? res.data : JSON.stringify(res.data)).trim();
    chatHistory[senderID].push(`chitti: ${botReply}`);
        return api.sendMessage(botReply, threadID, messageID);
          } catch (err) {
              console.error("Pollinations error:", err.message);
                  return api.sendMessage("⚡ System error: Chitti ka chip garam ho gaya 😅", threadID, messageID);
                    }
                    };
module.exports.run = async function ({ api, event }) {
  return api.sendMessage(
      "Mere sath baat karne ke liye 'chitti green' ya 'chitti red' likho 🤖",
          event.threadID,
              event.messageID
                );
                };
