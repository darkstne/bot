const Discord = require('discord.js');

module.exports = {
    name: 'ip',
    description: 'Gives server IP',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Server IPs")
            .addFields({
                name: "SMP",
                value: "smp.totalfreedom.me",
            }, {
                name: "Free-OP",
                value: "play.totalfreedom.me"
            });
        return message.channel.send(embed);
    }
}