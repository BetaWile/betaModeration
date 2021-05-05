const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.üstyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, \`.unmute @etiket/ID\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    if (user.id === message.author.id) return message.react(ayar.no)
    if (user.id === client.user.id) return message.react(ayar.no)
    if (user.hasPermission(8)) return message.react(ayar.no)


    let data = await kdb.get(`durum.${user.id}.mute`)
    if (!data) return message.channel.send(embed.setDescription(`${user} Adlı kullanıcı zaten muteli değil.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (data) {
        user.roles.remove(ayar.muteRol).catch()
        message.react(ayar.yes)
        client.channels.cache.get(ayar.muteLog).send(embed.setDescription(`
${user} \`${user.id}\` Adlı kullanıcının metin kanallarındaki susturulması kaldırıldı.
`))
        kdb.delete(`durum.${user.id}.mute`)
    }



};
exports.conf = {
    name: "unmute",
    aliases: ["unchatmute", "uncmute"],
    permLevel: 0
};