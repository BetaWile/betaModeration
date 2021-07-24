const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
const moment = require("moment");
exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.banYT) && !message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    let reason = args.splice(1).join(" ") || "Sebep belirtilmedi."
    if (!user) return message.channel.send(beta.setDescription(`${message.author}, Eksik arguman kullandınız, \`!vmute @etiket/ID 1m Küfür\``));


    if (user.id === message.author.id) return message.react(config.Diger.no);
    if (user.id === client.user.id) return message.react(config.Diger.no);
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.react(config.Diger.no);


    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let banAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "20"
    user.ban({ reason: reason });
    message.channel.send(beta.setDescription(`${user} - (\`${user.id}\`) Adlı kullanıcı sunucudan yasaklandı.`));

    db.add(`cezaid.${message.guild.id}`, +1);
    kdb.add(`banlar.${message.author.id}`, 1);
    kdb.add(`cezapuan.${user.id}`, 20);
    kdb.push(`sicil.${user.id}`, { userID: user.id, adminID: message.author.id, Tip: "BAN", start: banAtılma, cezaID: cezaID });
    client.channels.cache.get(config.Log.cezapuanlog).send(`${user}: aldığınız **#${cezaID}** ID'li ceza ile **${puan}** ceza puanına ulaştınız.`);
    client.channels.cache.get(config.Log.banLog).send(beta.setDescription(`
    ${user} \`${user.id}\` Adlı kullanıcı yasaklandı.

    \`•\` Yetkili: ${message.author} (\`${message.author.id}\`)
    \`•\` Kullanıcı: ${user} (\`${user.id}\`)
    \`•\` Sebep: \`${reason}\`
    \`•\` Tarih: \`${banAtılma}\`
    `));
};
module.exports.config = { 
    name: 'ban',
    aliases: ['ban']
};  