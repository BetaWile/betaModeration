const Discord = require("discord.js");

exports.run = async(client, message, args) => {

if (!message.member.voice.channel) {
return message.reply("Ses kanalında olman lazım!").then(m => m.delete,{timeout: 7000});;;
}
const filter = (reaction, user) => {
return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};

let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!kullanıcı) return message.channel.send('Bir Kullanıcı Belirt.').then(m => m.delete,{timeout: 7000});;

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send('Etiketlenen Kullanıcı Ses Kanalında Değil.').then(m => m.delete,{timeout: 7000});;

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let mesaj = await message.channel.send(embed.setDescription(`${kullanıcı}, ${message.author} \`${message.member.voice.channel.name}\` Odasına Çekmek İstiyor. Kabul ediyormusun ?`))
await mesaj.react("✅")
await mesaj.react("❌")
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.name === '✅') {
let kabul = new Discord.MessageEmbed()
.setColor("0x348f36")
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Onayladı`)
message.channel.send(kabul)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let red = new Discord.MessageEmbed()
.setColor("0x800d0d")
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Reddetti`)
message.channel.send(red)
}
})
}
exports.conf = {
    name: "çek",
    aliases: [],
    permLevel: 0
};