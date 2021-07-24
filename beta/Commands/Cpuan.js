const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)

    let cpuan = await kdb.fetch(`cezapuan.${user.id}`) || "0"

    message.channel.send(beta.setDescription(`${user} adlı kullanıcı **${cpuan}** cezapuanına sahip.`))

};
module.exports.config = { 
    name: 'cezapuan',
    aliases: ['cezapuan', 'cezapuanı', 'cpuan', 'puan']
};