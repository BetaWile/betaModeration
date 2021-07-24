const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
const moment = require("moment");

exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.banYT) && !message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

    let user = await client.users.fetch(args[0]);
    if (!args[0]) return message.channel.send(beta.setDescription(`${message.author}, Eksik arguman kullandınız, \`Lütfen bir ID giriniz.\``));
    
    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let unban = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    //---------------------------------------------------------------------------------//
    message.guild.members.unban(user.id)
    message.channel.send(beta.setDescription(`<@!${user.id}> - (\`${user.id}\`) Kullanıcısının Yasağı Kaldırıldı.`));
    client.channels.cache.get(config.Log.banLog).send(beta.setDescription(`
<@!${user.id}> \`${user.id}\` Adlı Kullanıcının Yasağı Kaldırıldı.

 \`•\` Yetkili: ${message.author} (\`${message.author.id}\`)
 \`•\` Kullanıcı: ${user} (\`${user.id}\`)
 \`•\` Tarih: ${unban}
 `));
};
module.exports.config = { 
    name: 'unban',
    aliases: ['unban']
};  