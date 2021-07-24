const Discord = require("discord.js");
const Main = require('./../Settings/Settings.json');

module.exports = client => {

      client.user.setActivity(`${Main.Status}`, { status: "online"} ,{ type: 'PLAYİNG'})
      .then(console.log(`${client.user.tag} İsmiyle Discord Bağlantısı kuruldu.`))
      .catch(() => console.log(`Bir hata ile karşılaştım.`))

};