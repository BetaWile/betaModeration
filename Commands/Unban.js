const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.üstyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    let user = await client.users.fetch(args[0]);
    if (!args[0]) return message.channel.send(embed.setDescription(`${m}, Bir ID Girmelisin.`))
    //---------------------------------------------------------------------------------//
    message.guild.members.unban(user.id)
    message.channel.send(embed.setDescription(`<@!${user.id}> - (\`${user.id}\`) Kullanıcısının Yasağı Kaldırıldı.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    client.channels.cache.get(ayar.banLog).send(embed.setDescription(`
<@!${user.id}> \`${user.id}\` Adlı Kullanıcının Yasağı Kaldırıldı.

 \`•\` Yetkili: ${message.author}
 \`•\` Kullanıcı: ${user}
 \`•\` Kullanıcı ID: (\`${user.id}\`)`))
};
exports.conf = {
    name: "unban",
    aliases: [],
    permLevel: 0
};