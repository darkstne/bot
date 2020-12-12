const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'pause',
    description: 'Pause a song',
    args: true,
    hide: true,
    // voice: true,
    execute(message, args) {
        const channel = message.member.voice.channel;
    }
}