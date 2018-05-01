const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true,
});

var fs = require('fs');

client.commands = new Discord.Collection();

fs.readdir("./commandes/", (err, files) => {

  if(err) console.log(err);
  let cmd = files.filter(f => f.split(".").pop() === "js")
  if(cmd.length <= 0){
    console.log("Aucunes commandes trouvées :/");
    return;
  }

  cmd.forEach((f, i) =>{
    let fichier = require(`./commandes/${f}`);
    console.log(`Commande ${f} chargée!`);
    client.commands.set(fichier.help.name, fichier);
  });
});

fs.readdir('./events/', (err, files) => {
  if (err) throw err;
  console.log(`Nombre d\'events en chargement ${files.length}`);

  files.forEach((f) => {
    const events = require(`./events/${f}`);
    const event = f.split('.')[0];
    client.on(event, events.bind(null, client));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

fs.readdir('./fonctions/', (err, files) => {
  if (err) return console.log(err);
  console.log(`Nombre de plugins en chargement ${files.length}`);

  files.forEach((f) => {
    const fonctions = require(`./fonctions/${f}`);
    client[f.split('.')[0]] = fonctions;
  });
});

client.login(process.env.TOKEN);

module.exports = client;
