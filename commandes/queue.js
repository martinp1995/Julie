const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(client.I18n.translate`⚠ Le bot ne joue pas !`);

          let queue = client.fonctions.enqueue(msg.guild.id);
            
            if (queue.length == 0) return msg.channel.send(client.I18n.translate`⚠ Il n'y a **aucune** musiques dans la queue !`);
            
            let text = '';
            for (let i = 0; i < queue.length; i++) {
                text += client.I18n.translate`${(i + 1)}. ${queue[i].title} | Ajouté par ${queue[i].requested}\n`
            };

             if(text.length > 1900) {
                    text = text.substr(0, 1900)
                    text = text + "..."
                }

            msg.channel.send(client.I18n.translate`🌐 Liste de la file d'attente:\n\`\`\`${text}\`\`\``);

}

module.exports.help = {
    name : "queue",
    usage: "queue",
    description: "Voir la file d'attente de musique du serveur",
    type: "musique"
}



            
