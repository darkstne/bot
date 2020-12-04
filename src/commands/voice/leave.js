const Discord = require('discord.js');

module.exports = {
    name: 'leave',
    description: 'Leave the channel you are in',
    voice: true,
    execute(message) {
        const channel = message.member.voice.channel;

        if (channel !== null) {
            channel.leave(channel);
        } else {
            return message.channel.send("You are not in a voice channel.");
        }
    }
}