const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)

    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
    let x = await kdb.fetch(`sicil.${user.id}`);
    if (!x) return message.channel.send(beta.setDescription(`
${user} Kullanıcısının sicil geçmişi temiz.
`));
    let sicil = x.map((data, index) => `**[${data.Tip || "belirtilmemiş"}]** <@!${data.adminID || "belirtilmemiş"}> tarafından \`${data.start || "belirtilmemiş"}\` tarihinde cezalandırıldı. \`#${data.cezaID || "Bulunamadı"}\``);

    const betaaaaaaaa = beta.setDescription(`
${sicil.join("\n") || "Bu kullanıcının sicili temiz."}

**Ceza puanı:** \`${puan}\`
`);
    message.channel.send(betaaaaaaaa);

};
module.exports.config = { 
    name: 'sicil',
    aliases: ['sicil']
};