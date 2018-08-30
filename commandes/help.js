const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

    var lang;

         let langue = await client.db.fetch(msg.guild.id);

         if(langue != null){

        var lang = langue;

       }else{

        var lang = "fr";
        
       }

    let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
		.setThumbnail(client.user.avatarURL) 
        .setColor(0xBCFF78)
        .setDescription(client.I18n.translate`Nombre de commandes: **${client.commands.filter(c => { return c.help.description != "Commande bot Owner"; }).size}**\n\nVoici la liste des commandes:`)
        .addField("▸ Bot", client.commands.filter(c => { return c.help.type === "bot"; }).map(c => `• **${c.help.name}** - ${require("../traductions/"+lang+".json")["strings"][c.help.description]}`).join("\n"))
        .addBlankField(true)
        .addField(client.I18n.translate`▸ Utilitaire`, client.commands.filter(c => { return c.help.type === "utilitaire"; }).map(c => `• **${c.help.name}** - ${require("../traductions/"+lang+".json")["strings"][c.help.description]}`).join("\n"))
        .addBlankField(true)
        .addField(client.I18n.translate`▸ Musique`, client.commands.filter(c => { return c.help.type === "musique"; }).map(c => `• **${c.help.name}** - ${require("../traductions/"+lang+".json")["strings"][c.help.description]}`).join("\n"))    
        .setFooter(client.I18n.translate`${client.user.username} © Créé par Sworder`)  
        if(msg.author.id === '240508683455299584') embed.addBlankField(true).addField("▸ Owner", client.commands.filter(c => { return c.help.type === "owner"; }).map(c => `• **${c.help.name}** - ${require("../traductions/"+lang+".json")["strings"][c.help.description]}`).join("\n"))

    msg.channel.send(embed);
    
}

module.exports.help = {
    name : "help",
    usage: "help",
    description: "Voir la liste des commandes du bot",
    type: "bot"
}


                

            
