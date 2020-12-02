const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'list',
    description: 'List players online',
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle("SMP Player List")
        try {
            await fetch('http://beta.smp.play.totalfreedom.me:4567/list');
        } catch {
                embed.setDescription("Server is offline.");
            return message.channel.send(embed);
        }

        let players = await fetch('http://beta.smp.play.totalfreedom.me:4567/list');
        players = await players.json();

        let onlinePlayers = {
            owners: players.owner,
            administrators: players.admin,
            moderators: players.mod,
            members: players.default,
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