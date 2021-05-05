const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");

var prefix = ayar.prefix;

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.üstyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let enAltYetkiliRolü = message.guild.roles.cache.get(ayar.enAltYetkiliRol)
    let yetkililer = message.guild.members.cache.filter(s => s.roles.highest.position >= enAltYetkiliRolü.position && !s.user.bot)
    let sestekiyt = yetkililer.filter(s => s.voice.channel)
    let unsesyt = yetkililer.filter(s => !s.voice.channel)
    let aktifyt = yetkililer.filter(s => s.presence.status !== 'offline')
    let offlineyt = yetkililer.filter(s => s.presence.status === 'offline')
    let aktifunsesyt = yetkililer.filter(s => s.presence.status !== 'offline').filter(x => !x.voice.channel)

    if (args[0] === "say") {
        const sayembed = new MessageEmbed()
            .setColor('DARK')
            .setDescription(`
    Sunucumuzdaki toplam yetkili sayısı: **${yetkililer.size}**
    Sunucumuzdaki aktif yetkili sayısı: **${aktifyt.size}**
    Sunucumuzdaki sesteki yetkili sayısı: **${sestekiyt.size}**
    Sunucumuzdaki aktif olup seste olmayan yetkili sayısı: **${aktifunsesyt.size}**
    `)
        message.channel.send(sayembed)
    }
    if (args[0] === "dm") {
        message.channel.send(new MessageEmbed().setDescription(`${aktifunsesyt.size} Yetkiliye ses çağrısı yapılıyor.`).setColor('RANDOM')).then(async(msg) => {
            aktifunsesyt.array().forEach(async(beta, index) => {
                setTimeout(async() => {
                    msg.edit(new MessageEmbed().setDescription(`${beta} Yetkilisine özelden mesaj atıldı.`))
                    beta.send(`Aktifsin fakat seste değilsin lütfen ses kanalına gir.\n ${message.guild.name}`).catch(err => message.channel.send(`${beta} Aktifsin fakat seste değilsin lütfen ses kanalına gir.`) && msg.edit(new MessageEmbed().setDescription(`${beta} kullanıcısına özelden mesaj gönderilemediği için kanala etiketlendi.`)))
                }, index * 1500)
            })

        })

    }
    if (!args[0]) {
        message.channel.send(new MessageEmbed().setDescription(`
    Yetkili komutları:

    \`•\` **${prefix}yetkili say**
    Yetkililer hakkında detaylı bilgili verir.

    \`•\` **${prefix}yetkili dm**
    Aktif olup seste olmayan yetkililere dm atar.
    `))
    }
};
exports.conf = {
    name: "yetkili",
    aliases: ['yt'],
    permLevel: 0
};