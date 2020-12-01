const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'list',
    description: 'List players online',
    async execute(message) {
        let players = await fetch('http://play.totalfreedom.me:28966/list?json=true');
        players = await players.json();

        let onlinePlayers = {
            owners: players.owners,
            executives: players.executives,
            developers: players.developers,
            seniorAdmins: players.senioradmins,
            admins: players.admins,
            masterbuilders: players.masterbuilders,
            operators: players.operators,
            imposters: players.imposters,
        };

        if (players.online === 0) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Player List")
                .setDescription("There are no players online.");

            return message.channel.send(embed);
        };

        let embed = new Discord.MessageEmbed()
            .setTitle("Player List")
            .setDescription(`There are ${players.online} / ${players.max} players online.`);

        for (let x in onlinePlayers) {
            if (onlinePlayers[x].length !== 0) {
                embed.addFields({
                    name: `${x.charAt(0).toUpperCase() + x.slice(1)} (${onlinePlayers[x].length})`,
                    value: onlinePlayers[x].join(', '),
                });
            }
        };
        return message.channel.send(embed);
    }
};