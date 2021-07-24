const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../Settings/Config.json");
const kdb = new db.table("kullanıcı")

module.exports = async(member) => {

    let muteDurum = await kdb.get(`durum.${member.id}.mute`)
    let vmuteDurum = await kdb.get(`durum.${member.id}.vmute`)
    let jailDurum = await kdb.get(`durum.${member.id}.jail`)


    if (muteDurum) {
        member.roles.add(config.Roller.muteRol)
    }
    if (vmuteDurum) {
        setInterval(async() => {
            if (member.voice.channel) member.voice.setMute(true)
        }, 3000)

    }
    if (jailDurum) {
        member.roles.set([config.Roller.jailRol])
    }
}

module.exports.configuration = {
    name: "guildMemberAdd"
}