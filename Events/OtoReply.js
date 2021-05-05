const discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../settings.json");
//let selamlar = ["sa", "selam", "selamın aleyküm", "selamın aleykum", "sea", "sA", "selamın aleykm", "selamün aleyküm", "selamun aleykum"]
let taglar = ["tag", ".tag", "!tag", "-tag", "TAG", "Tag"]
module.exports = (message) => {
    if (message.author.bot) return;
    //if (selamlar.some(s => message.content.toLowerCase() === s)) {
    //    message.channel.send(`${message.author}, Aleyküm selam hoş geldin.`)
    //}
    if (taglar.some(t => message.content.toLowerCase() === t)) {
        message.channel.send(`${ayar.tag}`)
    }
};

module.exports.configuration = {
    name: "message"
};