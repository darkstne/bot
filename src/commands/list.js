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

        util.queryFull('hyfae.org', {port: 25565 })
            .then((res) => {
                if (res.onlinePlayers === 0) {
                    embed.setDescription("There are no players online.");
                    return message.channel.send(embed);
                }
                embed.setDescription(`There are ${res.onlinePlayers} / ${res.maxPlayers} players online.`);
                embed.addFields({
                    name: "Online Players",
                    value: `\`${res.players.join(', ')}\``
                });
                return message.channel.send(embed)
            })
            .catch(() => {
                embed.setDescription("The server is currently **offline**.")
            });

        // util.queryFull('hyfae.org', { port: 25566 }) // These are the default options
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((error) => {
        //     throw error;
        // });

        // try {
        //     await fetch('http://beta.smp.play.totalfreedom.me:4567/list');
        // } catch {
        //         embed.setDescription("Server is offline.");
        //     return message.channel.send(embed);
        // }

        // let players = await fetch('http://beta.smp.play.totalfreedom.me:4567/list');
        // players = await players.json();

        // let onlinePlayers = {
        //     owners: players.owner,
        //     administrators: players.admin,
        //     moderators: players.mod,
        //     members: players.default,
        // };

        // if (players.online === 0) {

        //     embed.setDescription("There are no players online.");
        //     return message.channel.send(embed);

        // }

        // embed.setDescription(`There are ${players.online} / ${players.max} players online.`);

        // for (let x in onlinePlayers) {

        //     if (onlinePlayers[x].length !== 0) {
        //         let rank = x.charAt(0).toUpperCase() + x.slice(1)
        //         embed.addFields({
        //             name: `${rank.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')} (${onlinePlayers[x].length})`,
        //             value: onlinePlayers[x].join(', '),
        //         });

        //     }

        // }

        // return message.channel.send(embed);
    }
}