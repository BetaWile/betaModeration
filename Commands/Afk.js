const { MessageEmbed, } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    let yasaklar = ["aq", "allah", "Allah", "discord.gg", ".gg", "discord.gg/", "https://", "amk", "sik"]
    let sebep = args.join(' ');
    if (sebep && yasaklar.includes(sebep)) return message.reply('Geçerli bir AFK sebebi belirtmelisin!').then(x => x.delete({ timeout: 5000 }) && message.delete());
    if (sebep) db.set(`${message.author.id}.afk.sebep`, sebep);
    db.set(`${message.author.id}.afk.sure`, new Date());
    if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(console.log);
    message.channel.send(embed.setDescription(`Artık AFK Modundasın. Mesajın Şu Şeklide Ayarlandı:${sebep}`)).then(m => m.delete({ timeout: 10000 }));
};
exports.conf = {
    name: "afk",
    aliases: [],
    permLevel: 0
};