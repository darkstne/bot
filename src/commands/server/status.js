const Discord = require("discord.js");
const fetch = require('node-fetch');
const util = require('minecraft-server-util')

module.exports = {
    name: 'status',
    description: 'Get the status of the server',
    hide: true,
    aliases: ['state'],
    async execute(message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00385C')

        // Lobby Status
        await util.status('51.81.34.106', {
                port: 25566,
                timeout: 2000,
            })
            .then(() => {
                embed.addFields({
                    name: "Lobby",
                    value: "Online"
                });
            })
            .catch(() => {
                embed.addFields({
                    name: "Lobby",
                    value: "Offline"
                });
            });

                    // Creative Status
        await util.status('51.81.34.106', {
            port: 25567,
            timeout: 500,
        })
        .then(() => {
            embed.addFields({
                name: "Creative Server",
                value: "Online"
            });
        })
        .catch(() => {
            embed.addFields({
                name: "Creative Server",
                value: "Offline"
            });
        });

        // Survival Status
        await util.status('51.81.34.106', {
                port: 25568,
                timeout: 2000,
            })
            .then(() => {
                embed.addFields({
                    name: "Survival Server",
                    value: "Online"
                });
            })
            .catch(() => {
                embed.addFields({
                    name: "Survival Server",
                    value: "Offline"
                });
            });



        return message.channel.send(embed)
    }
}