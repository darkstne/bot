const Discord = require('discord.js')
const fetch = require('node-fetch')
const util = require('minecraft-server-util');

module.exports = {
    name: 'list',
    description: 'List players online',
    aliases: ['l'],
    async execute(message) {
        // return;
        let embed = new Discord.MessageEmbed()
            .setColor('#00385C')
            // .setTitle("Darkstone Player List")

        // Bungee Query 
        await util.queryFull('51.81.34.106', {
            timeout: 5000,
        })
        .then(async (res) => {

            if (res.players.length === 0) return embed.setDescription("There are no players online.");

            let players = [];
            for (var i = 0; i < res.players.length; i++) {
                
                if (res.players[i].includes("_")) {
                    players.push(res.players[i].replace("_", "\\_"));
                    continue;
                }
                players.push(res.players[i]);
            }
            players = players.join(', ');
            embed.addField("Online Players", players);
        })

    return message.channel.send(embed)
    }
}