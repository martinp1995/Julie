const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true,
});

const fs = require('fs');

var config = require("./config.json");

client.I18n = require('node-i18n');
client.languages = {};
client.db = require("quick.db");
client.config = config;

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

fs.readdir('./traductions/', (err, files) => {
  if (err) return console.log(err);
  console.log(`Nombre de traductions en chargement ${files.length}`);

  files.forEach((f) => {
    const translation = require(`./traductions/${f}`);
    client.languages[f.split('.')[0]] = translation;
  });

  client.I18n.init({ bundles: client.languages, defaultCurrency: 'EUR' });
});

client.login(config.BOT_TOKEN);

module.exports = client;
