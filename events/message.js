module.exports = async (client, msg) => {

if(msg.author.bot) return;
if(msg.channel.type === "dm") return;

  if(msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}>`)) {
    
    if(!msg.content.split(" ")[1]) return;

    const cleverbot = require("cleverbot.io");
    const clever = new cleverbot(client.config.CLEVER_BOT.USER, client.config.CLEVER_BOT.API_KEY);

    clever.setNick(msg.author.username);
    clever.create(async function(err, session) {

           await msg.channel.startTyping();

        clever.ask(msg.content.split(" ").slice(1).join(" "), async function(err, res) {

           await msg.channel.stopTyping();
           await msg.channel.send(res);

        });

    });
  } 

  if (!msg.content.startsWith(client.config.BOT_PREFIX)) return; 

       	 let langue = await client.db.fetch(msg.guild.id);

       	 if(langue != null){

       	client.I18n.use(langue);

       }else{

       	client.I18n.use("fr");

       }

  let cmd = msg.content.slice(1).split(' ').shift().toLowerCase();
  let commande = client.commands.get(cmd);

  if(commande) commande.run(client, msg);
}
