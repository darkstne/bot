const Discord = require('discord.js');
const fetch = require('node-fetch');
const util = require('minecraft-server-util');

module.exports = {
    name: 'list',
    description: 'List players online',
    async execute(message) {
        util.queryFull('xensmp.net')
        .then((response) => {

            if (response.players.length === 0) {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColorMain)
                    .setTitle("Player List")
                    .setDescription("There are currently no players online.")
                    .setTimestamp()
                    .setFooter(config.botName);

                return message.channel.send(embed)
            }

            const players = response.players.join(', ');
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorMain)
                .setTitle("Player List")
                .setDescription(`There are ${response.onlinePlayers} / ${response.maxPlayers} players online.`)
                .addFields({
                    name: 'Online Players',
                    value: `${players}`
                })
                .setTimestamp()
                .setFooter(config.botName);
            return message.channel.send(embed);
        })
        .catch((error) => {
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorError)
                .setTitle("Player List")
                .setDescription("Server is **offline**.")
                .setTimestamp()
                .setFooter(config.botName);
            message.channel.send(embed);
        });
    }
}