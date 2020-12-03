const Discord = require('discord.js')
const fetch = require('node-fetch')
const util = require('minecraft-server-util');

module.exports = {
    name: 'list',
    description: 'List players online',
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setColor('#00385C')
            .setTitle("Hyfae Player List")

        let players;
        // Bungee Query
        await util.queryFull('hyfae.org', {
                port: 25565
            })
            .then((res) => {
                if (res.onlinePlayers === 0) {
                    embed.setDescription("There are no players online.");
                    players = 0;
                    return message.channel.send(embed);
                }
                embed.setDescription(`There is ${res.onlinePlayers} / ${res.maxPlayers} players online.`);
            })
            .catch(() => {
                embed.setDescription("There was an error loading player count.")
            });

        if (players === 0) return;

        // Lobby Query
        await util.queryFull('hyfae.org', {
                port: 25567
            })
            .then((res) => {
                if (res.onlinePlayers === 0) return;
                embed.addFields({
                    name: `Lobby (${res.players.length})`,
                    value: `\`${res.players.join(', ')}\``
                });
            })
            .catch(() => {
                embed.addFields({
                    name: "Lobby",
                    value: "There was an error loading players."
                });
            });

        // Survival Query    
        await util.queryFull('hyfae.org', {
                port: 25568
            })
            .then((res) => {
                if (res.onlinePlayers === 0) return;
                embed.addFields({
                    name: `Survival Server (${res.players.length})`,
                    value: `\`${res.players.join(', ')}\``
                });
            })
            .catch(() => {
                embed.addFields({
                    name: "Survival Server",
                    value: "There was an error loading players."
                });
            });

        // Creative Query    
        await util.queryFull('hyfae.org', {
                port: 25566
            })
            .then((res) => {
                if (res.onlinePlayers === 0) return;
                embed.addFields({
                    name: `Creative Server (${res.players.length})`,
                    value: `\`${res.players.join(', ')}\``
                });
            })
            .catch(() => {
                embed.addFields({
                    name: "Creative Server",
                    value: "There was an error loading players."
                });
            });
        return message.channel.send(embed)
    }
}