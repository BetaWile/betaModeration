const { MessageEmbed } = require("discord.js");
const config = require("../Settings/Config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
const moment = require("moment");

exports.beta = async(client, message, args) => {
    if (!message.member.roles.cache.has(config.Yetkili.muteYT) && !message.member.roles.cache.has(config.Yetkili.abilityYT) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(config.Diger.no);
    let beta = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));


    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.channel.send(beta.setDescription(`${message.author}, Eksik arguman kullandınız, \`!vmute @etiket/ID 1m Küfür\``));

   if (user.id === message.author.id) return message.react(config.Diger.no);
   if (user.id === client.user.id) return message.react(config.Diger.no);

    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let unmute = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;


    let data = await kdb.get(`durum.${user.id}.mute`);
    if (!data) return message.channel.send(beta.setDescription(`${user} Adlı kullanıcı zaten muteli değil.`));
    if (data) {
        user.roles.remove(config.Roller.muteRol).catch()
        message.channel.send(beta.setDescription(`<@!${user.id}> -  (\`${user.id}\`) Adlı kullanıcının metin kanallarındaki susturulması kaldırıldı.`));
        client.channels.cache.get(config.Log.muteLog).send(beta.setDescription(`
        <@!${user.id}> (\`${user.id}\`) Adlı kullanıcının metin kanallarındaki susturulması kaldırıldı.

        \`•\` Yetkili: ${message.author} (\`${message.author.id}\`)
        \`•\` Kullanıcı: ${user} (\`${user.id}\`)
        \`•\` Tarih: ${unmute}
        `));
        kdb.delete(`durum.${user.id}.mute`);
    }



};
module.exports.config = { 
    name: 'unmute',
    aliases: ['unmute', 'uncmute']
};  