const Discord = require('discord.js')
const fetch = require('node-fetch')
const util = require('minecraft-server-util');

module.exports = {
    name: 'list',
    description: 'List players online',
    aliases: ['l'],
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setColor('#00385C')
            .setTitle("Online Players")
        
        // Bungee Query
        await util.queryFull('darkst.one', {
                port: 25565,
                timeout: 5000,
            })
            .then((res) => {
                if (res.players.length == 0) {
                    embed.setDescription("There are no players online.");
                    // return message.channel.send(embed)
                } else {
                    embed.setDescription(`There are ${res.onlinePlayers} / ${res.maxPlayers} players online.`)

                }

            })
            .catch(() => {
                embed.setDescription("Unable to connect to server.");
                return message.channel.send(embed);
            })

        // Lobby Query
        await util.queryFull('darkst.one', {
                port: 25566,
                timeout: 2000,
            })
            .then(async (res) => {

                let players = [];
                for (var i = 0; i < res.players.length; i++) {

                    if (res.players[i].includes("_")) {
                        players.push(res.players[i].replace("_", "\\_"));
                        continue;
                    }

                    players.push(res.players[i]);

                }

                if (!players.length == 0) {
                    players = players.join(', ');
                    embed.addField(`Lobby Server (${res.players.length})`, players)
                }
            })
            .catch(() => {
                embed.addField("Lobby Server", "There was an error loading players.")
            })

        // Creative Query
        await util.queryFull('darkst.one', {
                port: 25567,
                timeout: 2000,
            })
            .then(async (res) => {

                let players = [];
                for (var i = 0; i < res.players.length; i++) {

                    if (res.players[i].includes("_")) {
                        players.push(res.players[i].replace("_", "\\_"));
                        continue;
                    }
                    players.push(res.players[i]);
                }
                if (!players.length == 0) {
                    players = players.join(', ');
                    embed.addField(`Creative Server (${res.players.length})`, players)
                }
            })
            .catch(() => {
                embed.addField("Creative Server", "There was an error loading players.")
            })

        // Survival Query
        await util.queryFull('darkst.one', {
                port: 25568,
                timeout: 5000,
            })
            .then(async (res) => {

                let players = [];
                for (var i = 0; i < res.players.length; i++) {

                    if (res.players[i].includes("_")) {
                        players.push(res.players[i].replace("_", "\\_"));
                        continue;
                    }
                    players.push(res.players[i]);
                }

                if (!players.length == 0) {
                    players = players.join(', ');
                    embed.addField(`Survival Server (${res.players.length})`, players)
                }
            })
            .catch(() => {
                embed.addField("Survival Server", "There was an error loading players.")
            })

            // Skyblock Query
            await util.queryFull('darkst.one', {
                port: 25570,
                timeout: 5000,
            })
            .then(async (res) => {

                let players = [];
                for (var i = 0; i < res.players.length; i++) {

                    if (res.players[i].includes("_")) {
                        players.push(res.players[i].replace("_", "\\_"));
                        continue;
                    }
                    players.push(res.players[i]);
                }

                if (!players.length == 0) {
                    players = players.join(', ');
                    embed.addField(`Skyblock Server (${res.players.length})`, players)
                }
            })
            .catch(() => {
                embed.addField("Skyblock Server", "There was an error loading players.")
            })

        return message.channel.send(embed)
    }
}