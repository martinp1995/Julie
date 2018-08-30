const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(client.I18n.translate`⚠ Le bot ne joue pas !`);

                let queue = client.fonctions.enqueue(msg.guild.id);
            
                if (queue.length == 0) return message.channel.send(client.I18n.translate`⚠ Il n'y a **aucune** musiques dans la queue !`).then(response => { response.delete(5000) });
                
                 client.fonctions.repeat(msg, queue, queue[0].link)            
}

module.exports.help = {
    name : "repeat",
    usage: "repeat",
    description: "Faire répéter la première musique de la file d'attente",
    type: "musique"
}

                