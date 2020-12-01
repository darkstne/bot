const Discord = require('discord.js');

module.exports = {
    name: 'ip',
    description: 'Gives server IP',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Server IPs")
            .addFields({
                name: "Free-OP",
                value: "play.totalfreedom.me",
            }, {
                name: "SMP",
                value: "beta.smp.play.totalfreedom.me"
            });
        return message.channel.send(embed);
    }
}