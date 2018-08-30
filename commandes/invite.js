const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

    msg.channel.send(client.I18n.translate`🎶 Voici le lien pour m'inviter: <https://discordapp.com/oauth2/authorize?client_id=440814309677858816&scope=bot&permissions=-1>`);

}

module.exports.help = {
    name : "invite",
    usage: "invite",
    description: "Obtenir mon lien d'invitation",
    type: "bot"
}


                

            
