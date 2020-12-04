const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'pause',
    description: 'Pause a song',
    args: true,
    voice: true,
    execute(message, args) {
        const channel = message.member.voice.channel;
        const song = args.slice(0).join(' ');

        if (channel !== null) {
           channel.join().then(connection => {
                const stream = ytdl(song, { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                
                dispatcher.on('finish', () => voiceChannel.leave());
            })
        } else {
            return message.channel.send("You are not in a voice channel.");
        }
    }
}