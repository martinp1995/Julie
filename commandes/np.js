const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (client, msg) => {

            if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(':warning: Vous devez être connecté dans un salon-vocal !')
                
                msg.member.voiceChannel.join()
            }

            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(':warning: Le bot ne joue pas !');

          let queue = client.fonctions.enqueue(msg.guild.id);
            
            if (queue.length == 0) return msg.channel.send(":warning: Il n'y a **aucunes** musiques dans la queue !");
                
                    ytdl.getInfo(queue[0].link, (err, info) =>{

            let embed = new Discord.RichEmbed()
        .setAuthor(queue[0].title)
        .setThumbnail(queue[0].thumbnails) 
        .setColor(0xFF0000)
        .addField(":bust_in_silhouette: Auteur", queue[0].channelTitle)
        .addField(":notepad_spiral: Description", (queue[0].description ? queue[0].description : "**Pas de description**"))
        .addField(":date: Date de publication", queue[0].publication)
        .addField(":clock1: Temps", `${Math.floor(msg.guild.voiceConnection.player.dispatcher.time / 60000)}:${Math.floor((msg.guild.voiceConnection.player.dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((msg.guild.voiceConnection.player.dispatcher.time % 60000)/1000) : Math.floor((msg.guild.voiceConnection.player.dispatcher.time % 60000)/1000)}/${client.fonctions.time(info.length_seconds)}`, true)
        .addField(':eye: Nombre de vues', info.view_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), true)
        .addField(":link: Lien", queue[0].link)
        .setFooter("demandé par @" + queue[0].requested);
    
            msg.channel.send("**:headphones: Actuellement en joue:**", embed);
    })               

}

module.exports.help = {
    name : "np",
    usage: "np",
    description: "Voir la musique actuellement en joue"
}            


                

            
