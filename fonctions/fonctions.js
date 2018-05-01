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

            msg.channel.send(":headphones: **En joue** - `" + queue[0].title + "` | demandé par `" + queue[0].requested + "`\n" + queue[0].link);

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
