switch (args[0]) {
      case "count": {
        let commands = client.commands.values();
        let infoCommand = "";
        api.sendMessage("[ 𝗖𝗠𝗗 ] - Currently includes " + client.commands.size + " usable commands 💌" + infoCommand, event.threadID, event.messageID);
        break;
      }
      case "list": {
        let commands = Array.from(global.client.commands.values());
        let msg = "📜 Available Commands:\n\n";
        commands.forEach(cmd => {
          msg += `- ${cmd.config.name} (${cmd.config.commandCategory})\n`;
        });
        return api.sendMessage(msg, threadID, messageID);
      }
      case "load": {
        if (moduleList.length == 0) return api.sendMessage("[ 𝗖𝗠𝗗 ] » Module name does not allow blank ⚠️", threadID, messageID);
        else return loadCommand({ moduleList, threadID, messageID });
      }
      case "unload": {
        if (moduleList.length == 0) return api.sendMessage("[ 𝗖𝗠𝗗 ] » Module name does not allow blank ⚠️", threadID, messageID);
        else return unloadModule({ moduleList, threadID, messageID });
      }
      case "loadAll": {
        moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example'));
        moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
        return loadCommand({ moduleList, threadID, messageID });
      }
      case "unloadAll": {
        moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example') && !file.includes("command"));
        moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
        return unloadModule({ moduleList, threadID, messageID });
      }
      case "info": {
        const command = global.client.commands.get(moduleList.join("") || "");
        if (!command) return api.sendMessage("[ 𝗖𝗠𝗗 ] » The module you imported does not exist ⚠️", threadID, messageID);

        const { name, version, hasPermssion, credits, cooldowns, dependencies } = command.config;

        return api.sendMessage(
          "====== " + name.toUpperCase() + " ======\n" +
          "- Commands created by: " + credits + "\n" +
          "- Version: " + version + "\n" +
          "- Request permissions: " + ((hasPermssion == 0) ? "User" : (hasPermssion == 1) ? "Admin" : "𝗦𝘂𝗽𝗽𝗼𝗿𝘁") + "\n" +
          "- Standby time: " + cooldowns + " seconds(s)\n" +
          `- Required packages: ${Object.keys(dependencies).join(", ") || "Without"}`,
          threadID, messageID
        );
      }
      default: {
        return global.utils.throwError(this.config.name, threadID, messageID);
      }
    }