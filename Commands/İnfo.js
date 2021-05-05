const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json")
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.botCommands) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)
    let muteler = await kdb.get(`muteler.${user.id}`) || "0"
    let banlar = await kdb.get(`banlar.${user.id}`) || "0"
    let jailler = await kdb.get(`jailler.${user.id}`) || "0"
    const embedd = embed.setDescription(`
${user} \`${user.id}\` Üyesinin bilgileri görüntülenmektedir.

Toplam kullanılan mute: \`${muteler}\`
Toplam kullanılan ban: \`${banlar}\`
Toplam kullanılan jail: \`${jailler}\`
`)
    message.channel.send(embedd);
};
exports.conf = {
    name: "info",
    aliases: [],
    permLevel: 0
};