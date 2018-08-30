const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(client.I18n.translate`⚠ Le bot ne joue pas !`);

          let queue = client.fonctions.enqueue(msg.guild.id);
            
            if (queue.length == 0) return msg.channel.send(client.I18n.translate`⚠ Il n'y a **aucune** musiques dans la queue !`);
                
                    ytdl.getInfo(queue[0].link, (err, info) => {

        if(err) return msg.channel.send(client.I18n.translate`❌ Une erreur est survenue lors de la récupération des informations de la vidéo`);

let Progress = ["▬","▬","▬","▬","▬","▬","▬","▬","▬","▬","▬","▬","▬","▬","▬","▬"];

Progress[Math.round(Progress.length*((msg.guild.voiceConnection.player.dispatcher.time / 1000)/info.length_seconds))] = ':radio_button:'

            let embed = new Discord.RichEmbed()
        .setAuthor(queue[0].title)
        .setThumbnail(queue[0].thumbnails) 
        .setColor(0xBCFF78)
        .addField(client.I18n.translate`• Temps`, (info ? `${Math.floor(msg.guild.voiceConnection.player.dispatcher.time / 60000)}:${Math.floor((msg.guild.voiceConnection.player.dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((msg.guild.voiceConnection.player.dispatcher.time % 60000)/1000) : Math.floor((msg.guild.voiceConnection.player.dispatcher.time % 60000)/1000)}/${client.fonctions.time(info.length_seconds)}\n${Progress.join("")}` : "Aucune durée trouvée"), true)
        .setFooter(client.I18n.translate`demandé par @${queue[0].requested}`);
    
            msg.channel.send(client.I18n.translate`🎧 Position du temps actuelle dans la musique: \`${queue[0].title}\``, embed);
    })               

}

module.exports.help = {
    name : "time",
    usage: "time",
    description: "Voir la position du temps actuelle de la musique actuellement en joue",
    type: "musique"
}


                

            
