const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const moment = require("moment");
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.üstyetki) && !message.member.roles.cache.has(ayar.banHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    let reason = args.splice(1).join(" ") || "Sebep belirtilmedi."
    if (!user) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, \`.ban @etiket/ID reklam\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    let banLimit = await kdb.get(`banlimit.${message.author.id}`)
    if (banLimit >= ayar.banLimit) {
        return message.channel.send(embed.setDescription(`${message.author}, Ban limit sınırına ulaştın limitin sıfırlanmasını bekle!`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 6999 }))
    }

    if (user.id === message.author.id) return message.react(ayar.no)
    if (user.id === client.user.id) return message.react(ayar.no)
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.react(ayar.no)
    if (user.hasPermission(8)) return message.react(ayar.no)



    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let banAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
    message.react(ayar.yes)
    user.ban({ reason: reason })
    message.channel.send(embed.setDescription(`${user} (\`${user.id}\`) Adlı kullanıcı ${message.author} tarafından yasaklandı. \`#${cezaID}\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    db.add(`cezaid.${message.guild.id}`, +1)
    kdb.add(`banlar.${message.author.id}`, 1)
    kdb.add(`cezapuan.${user.id}`, 20)
    kdb.push(`sicil.${user.id}`, { userID: user.id, adminID: message.author.id, Tip: "BAN", start: banAtılma, cezaID: cezaID })
    kdb.add(`banlimit.${message.author.id}`, 1)
    client.channels.cache.get(ayar.cezapuan).send(`${user}: aldığınız **#${cezaID}** ID'li ceza ile **${puan}** ceza puanına ulaştınız.`)
    client.channels.cache.get(ayar.banLog).send(embed.setDescription(`
    ${user} \`${user.id}\` Adlı kullanıcı yasaklandı.

    \`•\` Yasaklayan: ${message.author} (\`${message.author.id}\`)
    \`•\` Sebep: \`${reason}\`
    \`•\` Tarih: \`${banAtılma}\`
    `))
};
exports.conf = {
    name: "ban",
    aliases: [],
    permLevel: 0
};