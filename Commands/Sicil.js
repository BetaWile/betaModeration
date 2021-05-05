const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.botCommands) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)

    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
    let x = await kdb.fetch(`sicil.${user.id}`)
    if (!x) return message.channel.send(embed.setDescription(`
${user} Kullanıcısının sicil geçmişi temiz.
`)).then(m => m.delete({ timeout: 7000 }))
    let sicil = x.map((data, index) => `**[${data.Tip|| "belirtilmemiş"}]** <@!${data.adminID|| "belirtilmemiş"}> tarafından \`${data.start|| "belirtilmemiş"}\` tarihinde cezalandırıldı. \`#${data.cezaID || "Bulunamadı"}\``)

    const sembed = embed.setDescription(`
${sicil.join("\n") || "Bu kullanıcının sicili temiz."}

**Ceza puanı:** \`${puan}\`
`)
    message.channel.send(sembed).then(m => m.delete({ timeout: 10000 }))

};
exports.conf = {
    name: "sicil",
    aliases: [],
    permLevel: 0
};