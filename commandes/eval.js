const Discord = require("discord.js");


module.exports.run = async (client, msg) => {

var util = require("util");

let args = msg.content.split(" ").slice(1);
let code = args.join(' ');

  if (msg.author.id != 'ur id') return;

  try {

                let ev = eval(code)

                let str = util.inspect(ev, {
                    depth: 1
                })

                 str = `${str.replace(new RegExp(`${client.token}`, "g"), "client.token")}`;

                if(str.length > 1900) {
                    str = str.substr(0, 1900)
                    str = str + "..."
                }

    msg.react("✅");

    msg.channel.send('**:ballot_box_with_check: Eval réussi:**\n'+ '\`\`\`JS\n' + str + '\`\`\`');} catch (err) {

    msg.react("❌");

    msg.channel.send('**:x: Eval fail:**\n'+'\`\`\`JS\n' + err + '\`\`\`');

    }

}


module.exports.help = {
    name : "eval",
    usage: "eval <code>",
    description: "Commande réservée au propriétaire du bot",
    type: "owner"
}
