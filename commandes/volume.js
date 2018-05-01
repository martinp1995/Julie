const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

		if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

        let args = msg.content.split(" ");

    if (parseInt(args[1]) > 100) return msg.channel.send(":warning: Le volume est déjà à son maximum !");

    msg.guild.voiceConnection.player.dispatcher.setVolume((parseInt(args[1]) / 100));

    msg.channel.send(":loud_sound: Le volume est désormais à `"+ parseInt(args[1]) + "/100`");

}

module.exports.help = {
    name : "volume",
    usage: "volume <nombre>",
    description: "Augmenter/Baisser le volume de la musique"
}        

            
