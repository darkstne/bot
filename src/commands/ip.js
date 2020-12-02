const Discord = require('discord.js');

module.exports = {
    name: 'ip',
    description: 'Gives server IP',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .addFields({
                name: "SMP Server",
                value: "smp.totalfreedom.me",
            }, {
                name: "Free-OP Server",
                value: "play.totalfreedom.me"
            });
        return message.channel.send(embed);
    }
}