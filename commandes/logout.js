const Discord = require("discord.js");


module.exports.run = async (client, msg) => {

if(msg.author.id == "240508683455299584"){

        msg.channel.send(":gear: Arrêt en cours...").then(() => {

        console.log('Je suis off');

        client.destroy();

        process.exit()
})
    } else {

    msg.channel.send("Pourquoi vouloir m'éteindre ;-;")
  }

}


module.exports.help = {
    name : "logout",
    usage: "logout",
    description: "Commande réservée au propriétaire du bot",
    type: "owner"
}