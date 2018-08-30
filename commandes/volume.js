const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


		if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(client.I18n.translate`⚠ Le bot ne joue pas !`);

        let args = msg.content.split(" ");

    if (parseInt(args[1]) > 100) return msg.channel.send(client.I18n.translate`⚠ Le volume est déjà à son maximum !`);

    msg.guild.voiceConnection.player.dispatcher.setVolume((parseInt(args[1]) / 100));

    msg.channel.send(client.I18n.translate`🔊 Le volume est désormais à \`${parseInt(args[1])}/100\``);

}

module.exports.help = {
    name : "volume",
    usage: "volume <nombre>",
    description: "Augmenter/Baisser le volume de la musique",
    type: "musique"
}


                

            
