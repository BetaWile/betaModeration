const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)
    let muteler = await kdb.get(`muteler.${user.id}`) || "0"
    let banlar = await kdb.get(`banlar.${user.id}`) || "0"
    let jailler = await kdb.get(`jailler.${user.id}`) || "0"
    const betaaa = beta.setDescription(`
**${user} (\`${user.id}\`) Üyesinin bilgileri.**

Toplam kullanılan mute: \`${muteler}\`
Toplam kullanılan ban: \`${banlar}\`
Toplam kullanılan jail: \`${jailler}\`
`);
    message.channel.send(betaaa);
};
module.exports.config = { 
    name: 'info',
    aliases: ['info']
};  