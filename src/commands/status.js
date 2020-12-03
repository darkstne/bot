const Discord = require("discord.js");
const fetch = require('node-fetch');
const util = require('minecraft-server-util')

module.exports = {
    name: 'status',
    description: 'Get the status of the server.',
    aliases: ['state'],
    async execute(message) {
        const embed = new Discord.MessageEmbed()
        util.status('hyfae.org')
            .then(() => {
                embed.setColor('#3FDB80')
                embed.setDescription("Hyfae is **online**.");
                return message.channel.send(embed)
            })
            .catch(() => {
                embed.setColor('#ff6961');
                embed.setDescription("Hyfae is **offline**.");
                return message.channel.send(embed);
            });
        // const embed = new Discord.MessageEmbed()
        // try {
        //     await fetch('http://beta.smp.play.totalfreedom.me:4567/list');
        // } catch {
        //     embed.setColor('#ff6961');
        //     embed.setDescription("The SMP server is **offline**.");
        //     return message.channel.send(embed);
        // }
        // embed.setColor('#3FDB80')
        // embed.setDescription("The SMP server is **online**.");
        // return message.channel.send(embed);
    }
}