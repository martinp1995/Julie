const Discord = require("discord.js");

module.exports.run = async (client, msg) => {

let args = msg.content.split(" ");

let availableLang = {
  "en": "en",
  "fr": "fr"
}
     let embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} Langue`, client.user.avatarURL)
        .setColor(0xBCFF78)
        .setDescription(`:flag_fr: fr\n:flag_gb: en`)
        .setFooter(client.I18n.translate`demandé par @${msg.author.username}`);

      if(!args[1]) return msg.channel.send(client.I18n.translate`🌐 Langues disponibles:`, embed);

      if(!availableLang[args[1]]) return msg.channel.send(client.I18n.translate`❌ Ce choix n'est pas valable`);

       client.db.set(`${msg.guild.id}`, args[1])

       msg.channel.send(client.I18n.translate`${args[1].replace("fr", "🇫🇷").replace("en", "🇬🇧")} La langue a bien été changée`);

}

module.exports.help = {
    name : "lang",
    usage: "lang <langue>",
    description: "Changer la langue du bot",
    type: "bot"
}
