const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json")
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))

    if (!message.member.roles.cache.has(ayar.üstyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let toplam = message.guild.memberCount;
    let ses = message.guild.members.cache.filter(x => x.voice.channel).size
    let taglı = message.guild.members.cache.filter(x => x.user.username.includes(ayar.tag)).size
    let aktif = message.guild.members.cache.filter(x => x.presence.status !== "offline").size
    let boost = message.guild.premiumSubscriptionCount
    let boostlevel = message.guild.premiumTier

    message.channel.send(embed.setDescription(`
\`•\` Seste toplam \`${ses}\` kullanıcı var.
\`•\` Toplam \`${taglı}\` kişi tagımıza sahip.
\`•\` Sunucumuzda toplam \`${toplam}\` üye var.
\`•\` Sunucumuza toplam \`${boost}\` takviye yapılmış, \`${boostlevel}\`. seviye.
\`•\` Sunucumuzda toplam \`${aktif}\` çevrimiçi üye var.`));
};
exports.conf = {
    name: "say",
    aliases: [],
    permLevel: 0
};