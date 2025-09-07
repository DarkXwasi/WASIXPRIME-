const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports.config = {
  name: "pair",
  version: "1.2.0",
  author: "𝗪𝗮𝘀𝗲𝗲𝗺 𝗔𝗯𝗯𝗮𝘀𝗶",
  description: "Creates a fun animated pair image with love percentage, captions and credit",
  commandCategory: "fun",
  usages: "$pair",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  try {
    if (!event.isGroup) return api.sendMessage("❌ Ye command sirf groups me kaam karta hai!", event.threadID);

    const threadInfo = await api.getThreadInfo(event.threadID);
    const members = threadInfo.participantIDs.filter(id => id !== api.getCurrentUserID());

    if (members.length < 2) return api.sendMessage("Group me kam se kam 2 members hone chahiye!", event.threadID);

    // Randomly pick 2 members
    const shuffled = members.sort(() => 0.5 - Math.random());
    const [uid1, uid2] = shuffled.slice(0, 2);

    // Random hearts and captions
    const hearts = [
      "https://i.postimg.cc/8c1xY0kM/heart1.png",
      "https://i.postimg.cc/kXz5y9tZ/heart2.png",
      "https://i.postimg.cc/7ZC2yPjD/heart3.png"
    ];
    const captions = ["Best Couple 💕", "Soulmates 💖", "Made for Each Other ❤️"];
    const heartImg = hearts[Math.floor(Math.random() * hearts.length)];
    const caption = captions[Math.floor(Math.random() * captions.length)];

    const [img1, img2, heart] = await Promise.all([
      loadImage(`https://graph.facebook.com/${uid1}/picture?width=512&height=512`),
      loadImage(`https://graph.facebook.com/${uid2}/picture?width=512&height=512`),
      loadImage(heartImg)
    ]);

    const canvas = createCanvas(600, 300);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 600, 300);

    // Draw user pics
    ctx.drawImage(img1, 0, 0, 250, 300);
    ctx.drawImage(img2, 350, 0, 250, 300);

    // Draw heart
    ctx.drawImage(heart, 250, 50, 100, 100);

    // Random love percentage
    const lovePercent = Math.floor(Math.random() * 101);

    // Overlay text
    ctx.fillStyle = "#ff0055";
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${uid1} ❤️ ${uid2}`, 300, 200);
    ctx.fillText(`Love: ${lovePercent}%`, 300, 230);
    ctx.fillText(caption, 300, 260);
    ctx.fillStyle = "#000";
    ctx.font = "18px Arial";
    ctx.fillText("Credit: 𝗪𝗮𝘀𝗲𝗲𝗺 𝗔𝗯𝗯𝗮𝘀𝗶", 300, 280);

    // Save & send
    const filePath = path.join(__dirname, "..", "cache", `pair_${uid1}_${uid2}.png`);
    fs.writeFileSync(filePath, canvas.toBuffer());

    const message = `💖 Pair of ${uid1} & ${uid2} | Love: ${lovePercent}%\n📌 ${caption}`;
    api.sendMessage({ body: message, attachment: fs.createReadStream(filePath) }, event.threadID, () => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ Error creating fun pair image!", event.threadID);
  }
};