const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            if(!msg.guild.voiceConnection.player.dispatcher) return msg.channel.send(client.I18n.translate`⚠ Le bot n\'a pas reçu l\'ordre de jouer !`);

            msg.guild.voiceConnection.player.dispatcher.resume()

            msg.channel.send(client.I18n.translate`▶ Je recommence à rejouer votre musique`)
}

module.exports.help = {
    name : "resume",
    usage: "resume",
    description: "Remettre la musique en joue",
    type: "musique"
}

                