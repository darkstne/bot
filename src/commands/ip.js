const Discord = require('discord.js');

module.exports = {
    name: 'ip',
    description: 'Gives server IP',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .addFields({
                name: "Hyfae Server IP",
                value: "hyfae.org",
            });
        return message.channel.send(embed);
    }
}