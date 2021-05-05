const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const moment = require("moment");
const ms = require("ms");
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.botCommands) && !message.member.roles.cache.has(ayar.vmuteHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    let reason = args.splice(2).join(" ") || "Sebep belirtilmedi."
    if (!user) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, \`.vmute @etiket/ID 1m Küfür\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (!user.voice.channel) return message.react(ayar.no)
    if (!args[1]) return message.channel.send(embed.setDescription(`${message.author}, Eksik arguman kullandınız, \`.vmute @etiket/ID 1m Küfür\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    let sure = args[1]
        .replace("s", " Saniye")
        .replace("m", " Dakika")
        .replace("h", " Saat")
        .replace("d", " Gün")


    if (user.id === client.user.id) return message.react(ayar.no)
    if (user.id === message.author.id) return message.react(ayar.no)
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.react(ayar.no)



    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let bitişAy = moment(Date.now() + ms(args[1])).format("MM");
    let bitişSaat = moment(Date.now() + ms(args[1])).format("HH:mm:ss");
    let bitişGün = moment(Date.now() + ms(args[1])).format("DD");
    let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişSaat}`;
    let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
    let durum = await kdb.get(`durum.${user.id}.vmute`)
    if (durum) return message.channel.send(embed.setDescription(`${user} Adlı kullanıcının aktif bir **VOİCE-MUTE** cezası bulunmakta.`)).then(x => x.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    user.voice.setMute(true)
    message.react(ayar.yes)
    message.channel.send(embed.setFooter(`Üyenin ceza puanı: ${puan}`).setDescription(`
${user} Adlı kullanıcı ${message.author} tarafından \`${reason}\` sebebiyle  \`${sure}\` boyunca ses kanallarında susturuldu. Ceza ID: \`#${cezaID}\``)).then(x => x.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    db.add(`cezaid.${message.guild.id}`, +1)
    kdb.add(`muteler.${message.author.id}`, 1)
    kdb.add(`cezapuan.${user.id}`, 5)
    kdb.push(`sicil.${user.id}`, { userID: user.id, adminID: message.author.id, Tip: "VMUTE", start: muteAtılma, cezaID: cezaID })
    kdb.set(`durum.${user.id}.vmute`, true)
    client.channels.cache.get(ayar.cezapuan).send(`${user}: aldığınız **#${cezaID}** ID'li ceza ile **${puan}** ceza puanına ulaştınız.`)
    client.channels.cache.get(ayar.vmuteLog).send(embed.setDescription(`
    ${user} \`${user.id}\` Adlı kullanıcı ses kanallarında susturuldu.
    
    \`•\` Yetkili: ${message.author} (\`${message.author.id}\`)
    \`•\` Süre: \`${sure}\`
    \`•\` Sebep: \`${reason}\`
    \`•\` Tarih: \`${muteAtılma}\`
    \`•\` Bitiş: \`${muteBitiş}\``))
    setTimeout(async() => {

        await kdb.delete(`durum.${user.id}.vmute`)
        if (user.voice.channel) user.voice.setMute(false)
        let log = message.guild.channels.cache.get(ayar.vmuteLog)
        if (log) log.send(embed.setDescription(`${user} \`${user.id}\` Adlı kullanıcının ses kanallarında susturulması kalktı.`))
    }, ms(args[1]))
};
exports.conf = {
    name: "vmute",
    aliases: ["voicemute"],
    permLevel: 0
};