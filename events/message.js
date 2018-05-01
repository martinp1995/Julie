const fs = require("fs-extra")
const prefix = ["."];

module.exports = async (client, msg) => {

if(msg.author.bot) return;
if(msg.channel.type === "dm") return;

if (!msg.content.startsWith(prefix)) return; 

  let args = msg.content.toLowerCase().split(" ").slice(1);
  let cmd = msg.content.slice(prefix.length).trim().split(' ').shift().toLowerCase(); 
  let commande = client.commands.get(cmd);
  if(commande) commande.run(client,msg,prefix);
}
