module.exports = async (client) => {

console.log(`${client.user.username} en ligne`);

 client.user.setPresence({ game: { name: `${client.config.BOT_PREFIX}help pour voir mes commandes !`}});
}
