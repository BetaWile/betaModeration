const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json")
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.üstyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let victim = message.guild.member(member)
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.slice(1).join(" ")))
    if (!victim || !rol) return;

    if (victim.roles.cache.has(rol.id)) {
        victim.roles.remove(rol.id).catch()
        message.channel.send(embed.setDescription(`${victim} Adlı kullanıcıdan ${rol} rolü alındı.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    }
    if (!victim.roles.cache.has(rol.id)) {
        victim.roles.add(rol.id).catch()
        message.channel.send(embed.setDescription(`${victim} Adlı kullanıcıya ${rol} rolü verildi.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    }
};
exports.conf = {
    name: "rol",
    aliases: [],
    permLevel: 0
};