const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

const radio = {
    "franceinfo": "http://roo8ohho.cdn.dvmr.fr/live/franceinfo-midfi.mp3",
    "nrj": "http://185.52.127.132/fr/30001/mp3_128.mp3?origine=fluxradios",
    "rtl2": "http://streaming.radio.rtl2.fr/rtl2-1-48-192",
    "skyrock": "http://icecast.skyrock.net/s/natio_mp3_128k?tvr_name=tunein16&tvr_section1=128mp3",
    "rtl": "http://streaming.radio.rtl.fr/rtl-1-48-192",
    "rfm": "http://rfm-live-mp3-128.scdn.arkena.com/rfm.mp3",
    "bfm": "http://chai5she.cdn.dvmr.fr/bfmbusiness"
}

                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                
                if(!msg.member.voiceChannel.joinable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));
                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            let args = msg.content.split(" ").slice(1).join(" ").toLowerCase();
             
      if (!args) return msg.channel.send(client.I18n.translate`⚠ Veuillez spécifier un nom de radio, voici la liste des radios: **franceinfo**, **nrj**, **rtl2**, **skyrock**, **rtl**, **rfm**, **bfm**`)

        if(!radio[args]) return msg.channel.send(client.I18n.translate`⚠ Radio non-valide, voici la liste des radios: **franceinfo**, **nrj**, **rtl2**, **skyrock**, **rtl**, **rfm**, **bfm**`)
    
    msg.member.voiceChannel.join().then(connection => {

    require('http').get(radio[args], (res) => { 

            connection.playStream(res); 

     let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} FM`, client.user.avatarURL)
        .setColor(0xBCFF78)
        .addField(client.I18n.translate`• Radio`, "`"+args+"`")
        .addField(client.I18n.translate`• Lien`, "`"+radio[args]+"`")
        .setFooter(client.I18n.translate`demandé par @${msg.author.username}`);

     msg.channel.send(client.I18n.translate`📻 En joue:`, embed);
 
          });

  });

}

module.exports.help = {
    name : "radio",
    usage: "radio <nom de radio>",
    description: "Donner l'ordre au bot d'écouter la radio",
    type: "musique"
}
