const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
const moment = require("moment");
const ms = require("ms");
exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.vmuteYT) && !message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member);
    let reason = args.splice(2).join(" ") || "Sebep belirtilmedi."
    if (!user) return message.channel.send(beta.setDescription(`${message.author}, Eksik arguman kullandınız, \`!vmute @etiket/ID 1m Küfür\``));
    if (!args[1]) return message.channel.send(beta.setDescription(`${message.author}, Eksik arguman kullandınız, \`Lütfen bir süre giriniz.\``));
    let sure = args[1]
        .replace("s", " Saniye")
        .replace("m", " Dakika")
        .replace("h", " Saat")
        .replace("d", " Gün")


    if (user.id === client.user.id) return message.react(config.Diger.no);
    if (user.id === message.author.id) return message.react(config.Diger.no);
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.react(config.Diger.no);



    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let bitişAy = moment(Date.now() + ms(args[1])).format("MM");
    let bitişSaat = moment(Date.now() + ms(args[1])).format("HH:mm:ss");
    let bitişGün = moment(Date.now() + ms(args[1])).format("DD");
    let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişSaat}`;
    let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "8"
    let durum = await kdb.get(`durum.${user.id}.vmute`)
    if (durum) return message.channel.send(beta.setDescription(`${user} Adlı kullanıcının aktif bir **VOİCE-MUTE** cezası bulunmakta.`));

    user.voice.setMute(true);
    message.channel.send(beta.setDescription(`${user} -  (\`${user.id}\`) Adlı kullanıcı ses kanallarında susturuldu.`));

    db.add(`cezaid.${message.guild.id}`, +1);
    kdb.add(`muteler.${message.author.id}`, 1);
    kdb.add(`cezapuan.${user.id}`, 8);
    kdb.push(`sicil.${user.id}`, { userID: user.id, adminID: message.author.id, Tip: "VMUTE", start: muteAtılma, cezaID: cezaID });
    kdb.set(`durum.${user.id}.vmute`, true);

     client.channels.cache.get(config.Log.cezapuanlog).send(`${user}: aldığınız **#${cezaID}** ID'li ceza ile **${puan}** ceza puanına ulaştınız.`);
     client.channels.cache.get(config.Log.vmuteLog).send(beta.setDescription(`
    ${user} (\`${user.id}\`) Adlı kullanıcı ses kanallarında susturuldu.
    
    \`•\` Yetkili: ${message.author} (\`${message.author.id}\`)
    \`•\` Kullanıcı: ${user} (\`${user.id}\`)
    \`•\` Süre: \`${sure}\`
    \`•\` Sebep: \`${reason}\`
    \`•\` Tarih: \`${muteAtılma}\`
    \`•\` Bitiş: \`${muteBitiş}\``));
    setTimeout(async() => {

        await kdb.delete(`durum.${user.id}.vmute`)
        if (user.voice.channel) user.voice.setMute(false)
        let log = message.guild.channels.cache.get(config.Log.vmuteLog)
        if (log) await log.send(beta.setDescription(`
        ${user} (\`${user.id}\`) Adlı kullanıcının ses kanallarında susturulması kalktı.

        \`•\` Yetkili: ${message.author} (\`${message.author.id}\`)
        \`•\` Kullanıcı: ${user} (\`${user.id}\`)
        \`•\` Sebep: \`${reason}\`
        \`•\` Tarih: \`${muteBitiş}\`
        `));
    }, ms(args[1]))
};
module.exports.config = { 
    name: 'vmute',
    aliases: ['vmute', 'voicemute', 'sesmute']
}; 