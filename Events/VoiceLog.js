const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayar = require("../settings.json")
const client = global.client;

module.exports = (oldState, newState) => {
    if (ayar.sesLogKanali && newState.guild.channels.cache.get(ayar.sesLogKanali)) {
        let logKanali = newState.guild.channels.cache.get(ayar.sesLogKanali);

        if (!oldState.channelID && newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
        if (oldState.channelID && !newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
        if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`).catch();
        if (oldState.channelID && oldState.selfMute && !newState.selfMute) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
        if (oldState.channelID && !oldState.selfMute && newState.selfMute) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
        if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
        if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
      };
    }
    
    module.exports.configuration = {
      name: "voiceStateUpdate"
    }