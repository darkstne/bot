const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'list',
    description: 'List players online',
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle("Player List")
        try {
            await fetch('http://play.totalfreedom.me:28966/list?json=true');
        } catch {
                embed.setDescription("Server is offline.");
            return message.channel.send(embed);
        }

        let players = await fetch('http://play.totalfreedom.me:28966/list?json=true');
        players = await players.json();

        let onlinePlayers = {
            owners: players.owners,
            executives: players.executives,
            developers: players.developers,
            seniorAdmins: players.senioradmins,
            admins: players.admins,
            masterBuilders: players.masterbuilders,
            operators: players.operators,
            imposters: players.imposters,
        };

        if (players.online === 0) {

            embed.setDescription("There are no players online.");
            return message.channel.send(embed);

        }

        embed.setDescription(`There are ${players.online} / ${players.max} players online.`);

        for (let x in onlinePlayers) {

            if (onlinePlayers[x].length !== 0) {
                let rank = x.charAt(0).toUpperCase() + x.slice(1)
                embed.addFields({
                    name: `${rank.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')} (${onlinePlayers[x].length})`,
                    value: onlinePlayers[x].join(', '),
                });

            }

        }

        return message.channel.send(embed);
    }
}