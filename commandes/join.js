const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

        if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                
        if(!msg.member.voiceChannel.joinable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));
                
        if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));
    
    msg.member.voiceChannel.join().then(connection => {

            connection.playFile("./assets/join.mp3"); 

     msg.channel.send(":white_check_mark: salon rejoint !");

  });

}

module.exports.help = {
    name : "join",
    usage: "join",
    description: "Donner l'ordre au bot de se connecter à votre salon",
    type: "musique"
}
