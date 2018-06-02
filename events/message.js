const prefix = ["."];

module.exports = async (client, msg) => {

if(msg.author.bot) return;
if(msg.channel.type === "dm") return;

if (!msg.content.startsWith(prefix)) return; 
  
  let cmd = msg.content.slice(prefix.length).trim().split(' ').shift().toLowerCase(); 
  let commande = client.commands.get(cmd);
  
  if(commande) commande.run(client,msg,prefix);
}
