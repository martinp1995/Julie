const Discord = require('discord.js');
const client = require('../index.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
var search = require('youtube-search');
var ffmpeg = require("ffmpeg-binaries");
var moment = require("moment");
moment.locale("fr");
const rp = require("request-promise");


var dispatcher;

let queues = {};

const opts = {
    part: 'snippet',
    maxResults: 5,
    key: "AIzaSyAkC9g9W5CSarCaLVJqDNkQ0n_U6tldxIk",
    type: 'video'
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

    (async function(){

        let langue = await client.db.fetch(msg.guild.id);

         if(langue != null){

       await client.I18n.use(langue);

            }else{

       await client.I18n.use("fr");

        }

    }())
    
            if (!msg || !queue) return;

        if (song) {
            
                let stream = ytdl(song.link, {
                    audioonly: true
                })

                stream.on('error', (error) => {
                    return msg.channel.send(client.I18n.translate`❌ Une erreur est survenue lors de la récupération des informations de la vidéo`)
                });

                let test;

                if (queue.length === 0) test = true

                queue.push({
                    "title": song.title,
                    "requested": msg.author.username,
                    "toplay": stream,
		            "link": song.link,
                    "publication": moment(song.publishedAt).format('LLL'),
                    "channelTitle": song.channelTitle,
                    "description": song.description,
                    "thumbnails": song.thumbnails.default.url,
                    "videoId": song.id,
                })
                
            msg.channel.send(client.I18n.translate`🛰 Ajout à la queue - \`${queue[queue.length - 1].title}\``);
		    
            if (test) {
                    setTimeout(function() {
                        fonctions.play(msg, queue)
                    }, 1000)
                }

        } else if (queue.length != 0) {
            
            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`❌ Je ne suis pas connecté`);
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));

    console.log("Lien: " + queue[0].link);

    ytdl.getInfo(queue[0].link, (err, info) =>{

        if(err) return msg.channel.send(client.I18n.translate`❌ Une erreur est survenue lors de la récupération des informations de la vidéo`);

            let embed = new Discord.RichEmbed()
        .setAuthor(client.I18n.translate`Lecture`)
        .setThumbnail(queue[0].thumbnails) 
        .setColor(0xBCFF78)
        .setDescription(`[${queue[0].title}](${queue[0].link})`)
        .setFooter(client.I18n.translate`demandé par @${queue[0].requested}`);
    
msg.channel.send(client.I18n.translate`🎧 En joue:`, embed).then(async m => {

    if(!info){

        msg.channel.send(client.I18n.translate`⚠ Temps de musique introuvable, les réactions sont donc désactivées`).then(response => { response.delete(10000) });

    }else{

              const collecteur = m.createReactionCollector((reaction, user) => user.id === msg.author.id, { time: info.length_seconds*1000 });

           await m.react('⏹')
           await m.react('⏯')
           await m.react('⏭')
           await m.react('🔃')

            collecteur.on('collect', async (reaction) => {


            if (reaction.emoji.name === "⏹") {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(client.I18n.translate`⚠ Le bot ne joue pas !`);

                await msg.guild.voiceConnection.player.dispatcher.end()
                            
               await msg.channel.send(client.I18n.translate`✅ Je me suis bien arrêté`);

                   await collecteur.stop();
 
                    if(msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {

                        await m.clearReactions();

                    } 

                if (queue.length == 0) return;

                for (var i = queue.length - 1; i >= 0; i--) {
                   await queue.splice(i, 1);
                }
             }

             if (reaction.emoji.name === "⏯") {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


                if(!msg.guild.voiceConnection.player.dispatcher) return msg.channel.send(client.I18n.translate`⚠ Le bot n\'a pas reçu l\'ordre de jouer !`);

            if(msg.guild.voiceConnection.player.dispatcher.paused) {

           await msg.guild.voiceConnection.player.dispatcher.resume()
           await msg.channel.send(client.I18n.translate`▶ Je recommence à rejouer votre musique`).then(response => { response.delete(5000) });
        
        } else {

           await msg.guild.voiceConnection.player.dispatcher.pause();
           await msg.channel.send(client.I18n.translate`⏸ J\'ai mis votre musique en pause`).then(response => { response.delete(5000) });
       
        }
    }

            if (reaction.emoji.name === "🔃") {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(client.I18n.translate`⚠ Le bot ne joue pas !`);

                let queue = client.fonctions.enqueue(msg.guild.id);

            if (queue.length == 0) return msg.channel.send(client.I18n.translate`⚠ Il n'y a **aucune** musiques dans la queue !`).then(response => { response.delete(5000) });
              
              await client.fonctions.repeat(msg, queue, queue[0].link) 
            
             }

              if (reaction.emoji.name === "⏭") {

            if (!msg.guild.voiceConnection) return msg.channel.send(client.I18n.translate`⚠ Je ne suis pas connectée dans un salon-vocal !`)
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                                
                if(!msg.member.voiceChannel.speakable) return msg.channel.send(client.I18n.translate`⚠ Je n'ai pas la permission de \`rejoindre\` ou \`parler\` dans ce salon !`).catch(err => console.log(err));


            if(!msg.guild.voiceConnection.player.dispatcher || msg.guild.voiceConnection.player.dispatcher.paused) return msg.channel.send(client.I18n.translate`⚠ Le bot ne joue pas !`);

               await msg.guild.voiceConnection.player.dispatcher.end()   
               await msg.channel.send(client.I18n.translate`⏩ Changement de la musique en cours !`)

                    await collecteur.stop();

                    if(msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {

                        await m.clearReactions();

                    }                  

             }

            await reaction.remove(msg.author.id);

                })

                collecteur.on('end', async () => {

                    if(msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {

                        await m.clearReactions();

                    } 

                });

            }
        })
    })

            if(queue[0].toplay === null)  {

                queue[0].toplay = ytdl(queue[0].link, {
                    audioonly: true
                })

            }

            dispatcher = msg.guild.voiceConnection.playStream(queue[0].toplay)

            dispatcher.on('error', () => {

                msg.channel.send(client.I18n.translate`❌ Une erreur est survenue lors de la lecture`);
                queue.shift()
                fonctions.play(msg, queue)

            })

            dispatcher.on('end', () => {	

                if(msg.guild.me.voiceChannel.members.filter(m => m.id != client.user.id).size === 0){

                msg.channel.send(client.I18n.translate`J\'ai quitté le salon car vous m\'avez laissé toute seule 😠`);
                msg.guild.me.voiceChannel.leave()

                }else{

                setTimeout(() => {

                if (queue.length > 0) { 

                    queue.shift()
                    fonctions.play(msg, queue) 

                } 

            }, 1000)
        }
    })   
            
        } else {

            msg.channel.send(client.I18n.translate`⚠ Il n'y a plus **aucune** musiques dans la queue !`)
            
        }
    } catch (err) {

        if(err) return console.log(`[Erreur] ${err}`)   

    }
  },

     randomColor() {

  const colors = [0xED0505, 0xEDE605, 0x05ED52, 0x05AFED, 0xE605ED, 0xED0543, 0xC5C6C5, 0x111311];
  
  return colors[Math.floor(Math.random() * colors.length)];
  },

   time(temps){
        let retour = "";
        if (temps<60) {
            retour = `${temps}s`;
        } else if (temps<3600) {
            retour = `${Math.floor(temps/60)}:${temps%60}`;
        } else if (temps<86400) {
            retour = `${Math.floor(temps/3600)}:${Math.floor(temps%3600/60)}:${temps%3600%60}`;
        } else if (temps<604800) {
            retour = `${Math.floor(temps/86400)}:${Math.floor(temps%86400/3600)}:${Math.floor(temps%86400%3600/60)}:${temps%86400%3600%60}`;
        }
        return retour;
  },

  search(msg, query){

    (async function(){

        let langue = await client.db.fetch(msg.guild.id);

         if(langue != null){

       await client.I18n.use(langue);

            }else{

       await client.I18n.use("fr");

        }

    }())

     search(query, opts, function(err, results) {
               
                if (err) return msg.channel.send(client.I18n.translate`❌ Video non trouvée ou une erreur s'est produite`); 

                if(results.length === 0) return msg.channel.send(client.I18n.translate`⚠ Aucune musique trouvée !`);
                
        ytdl.getInfo(results[0].link, (error, info) =>{

            if(error) return msg.channel.send(client.I18n.translate`❌ Une erreur est survenue lors de la récupération des informations de la vidéo`);

            let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setThumbnail(results[0].thumbnails.default.url) 
        .setColor(0xBCFF78)
        .addField(client.I18n.translate`• Titre`, "`"+results[0].title+"`")
        .addField(client.I18n.translate`• Auteur`, "`"+results[0].channelTitle+"`")
        .addField(client.I18n.translate`• Description`, "`"+(results[0].description ? results[0].description : "**Pas de description**")+"`")
        .addField(client.I18n.translate`• Date de publication`, "`"+moment(results[0].publishedAt).format('LLL')+"`")
        .addField(client.I18n.translate`• Durée`, "`"+(info ? client.fonctions.time(info.length_seconds) : "Aucune durée trouvée")+"`", true)
        .addField(client.I18n.translate`• Nombre de vues`, "`"+ (info ?info.view_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Aucun nombres de vues trouvé") +"`", true)
        .addField(client.I18n.translate`• Lien`, "`"+results[0].link+"`")
        .setFooter(client.I18n.translate`demandé par @${msg.author.username}`);
    
            return msg.channel.send(client.I18n.translate`🔍 Résultat de la recherche pour: \`${query}\``, embed);

            })
        })
    },

    shuffle(queue) {

        let i = queue.length;

            while (i) {

            let random = Math.floor(Math.random() * i);
            let y = queue[--i];

                queue[i] = queue[random];
                queue[random] = y;
            }

        return queue;
    },

     searchSong(msg, song) {

        (async function(){

        let langue = await client.db.fetch(msg.guild.id);

         if(langue != null){

       await client.I18n.use(langue);

            }else{

       await client.I18n.use("fr");

        }

    }())

          search(song, opts, function(err, results) {

               
                if (err) return msg.channel.send(client.I18n.translate`❌ Video non trouvée ou une erreur s'est produite`); 

                let pre = "";

                let message = "";

                    if(results.length === 0) return msg.channel.send(client.I18n.translate`⚠ Aucune musique trouvée !`);

                    if(results.length > 1){

                      pre += client.I18n.translate`🔍 J'ai trouvé plus de **${results.length}** résultats pour: \`${song}\``;

                    }else{
                        return client.fonctions.play(msg, client.fonctions.enqueue(msg.guild.id), results[0]);

                    }   

                for(var i = 0; i < results.length; i++){

                    message += "\n▸ " + (i+1) + " - `" + results[i].title + "`\n";   
                }

                    message += client.I18n.translate`\n\nVeuillez entrer votre choix, taper \`annuler\` pour annuler.`;

                    var embed = new Discord.RichEmbed()
                      .setColor(0xBCFF78) 
                      .setDescription(message)
                      .setFooter(client.I18n.translate`demandé par @${msg.author.username}`)

                msg.channel.send(pre, embed).then(m => {

                    const filter = m => m.author.id == msg.author.id;

                    m.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {

                        collected = collected.first();

                        if(collected.content.toLowerCase() == "annuler") return msg.channel.send(client.I18n.translate`✅ Selection annulée`);
                        
                        let choice = collected.content.match(/\d{1}/g);

                        if(!choice || !choice.length) return msg.channel.send(client.I18n.translate`⚠ Ceci n'est pas un choix valide`);

                        choice = parseInt(choice[0])-1;

                        if(isNaN(choice) || choice > results.length || choice < 0) return msg.channel.send(client.I18n.translate`⚠ Ce choix ne fait pas parti de la selection`);
    
                        client.fonctions.play(msg, client.fonctions.enqueue(msg.guild.id), results[choice]);

                        m.delete()

                    }).catch(err =>  msg.channel.send(client.I18n.translate`⚠ Je n'ai pas réussi à récupérer vôtre choix`));
                })
            });
        },

             repeat(msg, queue, song) {

        (async function(){

        let langue = await client.db.fetch(msg.guild.id);

         if(langue != null){

       await client.I18n.use(langue);

            }else{

       await client.I18n.use("fr");

        }

    }())

          search(song, opts, function(err, results) {

                if (err) return msg.channel.send(client.I18n.translate`❌ Video non trouvée ou une erreur s'est produite`); 

                    if(results.length === 0) return msg.channel.send(client.I18n.translate`⚠ Aucune musique trouvée !`);

                        client.fonctions.play(msg, client.fonctions.enqueue(msg.guild.id), results[0]);

                })
        },

           playlist(msg, queue, song) {

    try {

        if (!msg || !queue) return;

        if (song) {

        (async function(){

        let langue = await client.db.fetch(msg.guild.id);

         if(langue != null){

       await client.I18n.use(langue);

            }else{

       await client.I18n.use("fr");

        }

    }())

        song = (song.includes("https://www.youtube.com/playlist?list=" || "https://m.youtube.com/playlist?list=")) ? song.replace("https://www.youtube.com/playlist?list=", "").replace("https://m.youtube.com/playlist?list=", "").split("&")[0] : song;

        const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/';

        Promise.all([getPlaylistName(), getPlaylistSongs([], null)]).then(async results => {

                if (!msg.guild.voiceConnection) {
                
                if (!msg.member.voiceChannel) return msg.channel.send(client.I18n.translate`⚠ Vous devez être connecté dans un salon-vocal !`)
                
                    await msg.member.voiceChannel.join()

                }

                await addToQueue(results[0], results[1]).then(async () => {

                    await client.fonctions.play(msg, queue);

                })

            }).catch(err => {

                console.log(err);

                msg.channel.send(client.I18n.translate`❌ Aucune playlist trouvée, pour ajouter une playlist faites: \`.playlist <id de la playlist>\``)

            });

        async function getPlaylistName() {  

            let options = {

                url: `${youtubeApiUrl}playlists?id=${song}&part=snippet&key=${opts.key}`

            }

            let body = await rp(options);

            let playlistTitle = JSON.parse(body).items[0].snippet.title;

            return playlistTitle;

        }



        async function getPlaylistSongs(playlistItems, pageToken) {

            pageToken = pageToken ? `&pageToken=${pageToken}` : '';

            let options = {

                url: `${youtubeApiUrl}playlistItems?playlistId=${song}${pageToken}&part=snippet,contentDetails&fields=nextPageToken,items(snippet(title,resourceId/videoId,thumbnails),contentDetails)&maxResults=50&key=${opts.key}`
            
            }

            let body = await rp(options);
            
            let playlist = JSON.parse(body);

            playlistItems = playlistItems.concat(playlist.items.filter(

                item => item.snippet.title != 'Deleted video'));

            if (playlist.hasOwnProperty('nextPageToken')) {

                playlistItems = await getPlaylistSongs(playlistItems, playlist.nextPageToken);

            }

            return playlistItems;
        }


        async function addToQueue(playlistTitle, playlistItems) {

            for (let i = 0; i < playlistItems.length; i++) {
        
        await search(`https://www.youtube.com/watch?v=${playlistItems[i].snippet.resourceId.videoId}`, opts, async function(err, results) {
               
                if (err) return; 

                await queue.push({
                    "title": results[0].title,
                    "requested": msg.author.username,
                    "toplay": null,
                    "link": results[0].link,
                    "publication": moment(results[0].publishedAt).format('LLL'),
                    "channelTitle": results[0].channelTitle,
                    "description": results[0].description,
                    "thumbnails": results[0].thumbnails.default.url,
                    "videoId": results[0].id,
                })
                
            })
        }

            if(queue.length > playlistItems.length || queue.length === playlistItems.length) {

                    await msg.channel.send(client.I18n.translate`❌ Une erreur est survenue lors du chargement de la playlist, des vidéos/musiques ne sont donc pas présente !`); 
            
                }else{       
                  
                   await msg.channel.send(client.I18n.translate`🛰 Playlist ajoutée à la queue avec succès`);
                  
                }  
            }

            } else {

             msg.channel.send(client.I18n.translate`⚠ Il n'y a plus **aucune** musiques dans la queue !`)
            
            }

        } catch (err) {

        if(err) return console.log(`[Erreur] ${err}`)  

        }
    },

}


module.exports = fonctions;



      