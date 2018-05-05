const Discord = require('discord.js');
const client = require('../index.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
var search = require('youtube-search');
var ffmpeg = require("ffmpeg-binaries");

var dispatcher;

let queues = {};

const opts = {
    part: 'snippet',
    maxResults: 3,
    key: process.env.YOUTUBE_API_KEY
}

const fonctions = {

     enqueue(guild) {    


        if (!guild) return;
        if (typeof guild == 'object') guild = guild.id
        if (queues[guild]) return queues[guild]
        else queues[guild] = []
        return queues[guild]
    },

     play(msg, queue, song) {
        
     try {

        if (!msg || !queue) return;

        if (song) {

            search(song, opts, function(err, results) {
               
                if (err) return msg.channel.send(":x: Video non trouvée ou une erreur s'est produite"); 
                
                song = (song.includes("https://" || "http://")) ? song : results[0].link

                let stream = ytdl(song, {
                    audioonly: true
                })

                let test;

                if (queue.length === 0) test = true

                queue.push({
                    "title": results[0].title,
                    "requested": msg.author.username,
                    "toplay": stream,
		    "link": results[0].link,
                    "publication": results[0].publishedAt,
                    "channelTitle": results[0].channelTitle,
                    "description": results[0].description,
                    "thumbnails": results[0].thumbnails.default.url,
                })
                
            msg.channel.send(":satellite_orbital: **Ajout à la queue** - `" + queue[queue.length - 1].title + "`");
		    
            if (test) {
                    setTimeout(function() {
                        fonctions.play(msg, queue)
                    }, 1000)
                }
            })
        } else if (queue.length != 0) {
            
            if (!msg.guild.voiceConnection) return msg.channel.send(":x: Je ne suis pas connecté");

            let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} - MUSIQUE`)
        .setThumbnail(queue[0].thumbnails) 
        .setColor(0xFF0000)
        .addField(":bust_in_silhouette: Auteur", queue[0].channelTitle)
        .addField(":notepad_spiral: Description", (queue[0].description ? queue[0].description : "**Pas de description**"))
        .addField(":date: Date de publication", queue[0].publication)
        .addField(":link: Lien", queue[0].link)
        .setFooter("demandé par @" + queue[0].requested);

            msg.channel.send("**:headphones: En joue:**", embed);

            dispatcher = msg.guild.voiceConnection.playStream(queue[0].toplay)

            dispatcher.on('error', () => {
                queue.shift()
                fonctions.play(msg, queue)
            })

            dispatcher.on('end', () => {	
                setTimeout(() => {
                if (queue.length > 0) { 
                    queue.shift()
                    fonctions.play(msg, queue) 
                } 
            }, 1000)
        })
            
        } else {
            msg.channel.send(":warning: Il n'y a plus **aucunes** musiques dans la queue !")
            
        }
    } catch (err) {
        if(err) return console.log(`[Erreur] ${err}`)    
    }
  },
     randomColor() {

  const colors = [0xED0505, 0xEDE605, 0x05ED52, 0x05AFED, 0xE605ED, 0xED0543, 0xC5C6C5, 0x111311];
  
  return colors[Math.floor(Math.random() * colors.length)];
  }
}

module.exports = fonctions;
