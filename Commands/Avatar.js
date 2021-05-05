const Discord = require('discord.js');

exports.run = async(client, message, args) => {
//let us = message.guild.members.cache.find(u => args.slice(0).join(' ').includes(u.username))
let muser = message.mentions.users.first();
let userid;
if(isNaN(args[0])){
  if(!muser){
    userid = message.author.id;
  }else{
    userid = muser.id;
  }
}else{
  userid = args[0];
}
try{
let user = await client.users.fetch(userid);
let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
if(avatar.endsWith(".gif?size=1024")) {

let embed = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RANDOM")
message.channel.send(embed)

} else {

  let embed = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("RANDOM")
message.channel.send(embed)

}
}catch{
  message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription("Kullanıcıyı Bulamadım!"));
  return;
}
}
exports.conf = {
  name: "avatar",
  aliases: [],
  permLevel: 0
};