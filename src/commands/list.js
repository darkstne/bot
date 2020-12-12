const Discord = require('discord.js')
const fetch = require('node-fetch')
const util = require('minecraft-server-util');

module.exports = {
    name: 'list',
    description: 'List players online',
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setColor('#00385C')
            .setTitle("Darkstone Player List")

        let players;
        // Bungee Query
        await util.queryFull('darkst.one', {
                port: 25565,
            })
            .then(async (res) => {

                let max = res.maxPlayers;

                // Lobby Query
                await util.queryFull('darkst.one', {
                        port: 25567,
                    })
                    .then((res) => {
                        if (res.onlinePlayers === 0) return players = res.onlinePlayers;
                        players = res.onlinePlayers;
                        embed.addFields({
                            name: `Lobby (${res.players.length})`,
                            value: `\`${res.players.join(', ')}\``
                        });
                    })
                    .catch(() => {
                        embed.addFields({
                            name: "Lobby",
                            value: "Error loading players"
                        });
                    });

                // Survival Query    
                await util.queryFull('darkst.one', {
                        port: 25568,
                    })
                    .then((res) => {
                        if (res.onlinePlayers === 0) return players = res.onlinePlayers;
                        players = res.onlinePlayers + players;
                        embed.addFields({
                            name: `Survival Server (${res.players.length})`,
                            value: `\`${res.players.join(', ')}\``
                        });
                    })
                    .catch(() => {
                        embed.addFields({
                            name: "Survival Server",
                            value: "Error loading players"
                        });
                    });

                // Creative Query    
                await util.queryFull('darkst.one', {
                        port: 25566,
                    })
                    .then((res) => {
                        if (res.onlinePlayers === 0) return players = res.onlinePlayers;
                        players = res.onlinePlayers + players;
                        embed.addFields({
                            name: `Creative Server (${res.players.length})`,
                            value: `\`${res.players.join(', ')}\``
                        });
                    })
                    .catch(() => {
                        embed.addFields({
                            name: "Creative Server",
                            value: "Error loading players"
                        });
                    });

                if (players === 0) {
                    embed.setDescription("There are no players online.")
                } else {
                    embed.setDescription(`There is ${players} / ${max} players online.`);
                }
            });

        return message.channel.send(embed)
    }
}