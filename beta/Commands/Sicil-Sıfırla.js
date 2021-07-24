const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)
    kdb.delete(`sicil.${user.id}`)
    kdb.delete(`cezapuan.${user.id}`);;
    message.react(config.Diger.yes);

};
module.exports.config = { 
    name: 'sicilsil',
    aliases: ['sicilsil', 'sicil-sil', 'sicilsıfırla', 'sicil-sıfırla']
};  