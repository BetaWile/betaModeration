const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json")
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    let permObjesi = {};
    let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
    everPermleri.allow.toArray().forEach(p => {
        permObjesi[p] = true;
    });
    everPermleri.deny.toArray().forEach(p => {
        permObjesi[p] = false;
    });
    if (message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
        permObjesi["SEND_MESSAGES"] = false;
        message.channel.createOverwrite(everyone, permObjesi);
        message.channel.send(embed.setDescription("Kanal kilitlendi!"))
    } else {
        permObjesi["SEND_MESSAGES"] = true;
        message.channel.createOverwrite(everyone, permObjesi);
        message.channel.send(embed.setDescription("Kanal kilidi açıldı!")).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    };
};
exports.conf = {
    name: "kilit",
    aliases: [],
    permLevel: 0
};