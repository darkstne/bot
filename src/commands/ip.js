const Discord = require('discord.js');

module.exports = {
    name: 'ip',
    description: 'Gives server IP',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00385C')
            .setTitle("Server IP")
            .setDescription("darkst.one")
        return message.channel.send(embed);
    }
}