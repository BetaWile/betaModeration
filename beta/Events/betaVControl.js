const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayar = require("../Settings/Config.json");
const kdb = new db.table("kullanıcı")

module.exports = (oldState, newState) => {

        if ((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)) {
            let member = newState.member;
            let data = kdb.get(`durum.${member.id}.vmute`)
            if (!data) {
                member.voice.setMute(false)
            }
            if (data) {
                member.voice.setMute(true)
            }
        }

};

module.exports.configuration = {
    name: "voiceStateUpdate"
}