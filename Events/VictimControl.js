const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayar = require("../settings.json")
const kdb = new db.table("kullanıcı")

module.exports = async(member) => {

    let muteDurum = await kdb.get(`durum.${member.id}.mute`)
    let vmuteDurum = await kdb.get(`durum.${member.id}.vmute`)
    let jailDurum = await kdb.get(`durum.${member.id}.jail`)


    if (muteDurum) {
        member.roles.add(ayar.muteRol)
    }
    if (vmuteDurum) {
        setInterval(async() => {
            if (member.voice.channel) member.voice.setMute(true)
        }, 3000)

    }
    if (jailDurum) {
        member.roles.set([ayar.jailRol])
    }
}

module.exports.configuration = {
    name: "guildMemberAdd"
}