const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const YouTube = require('youtube-sr');

// sudo apt-get install ffmpeg # ffmpeg debian/ubuntu

module.exports = {
    name: 'play',
    description: 'Play a song',
    voice: true,
    args: true,
    usage: "<song name>",
    async execute(message, args) {
        const channel = message.member.voice.channel;
        const args1 = args.slice(0).join(' ');
        const song = await YouTube.search(args1, {
                limit: 1
            })
            .catch(e => {
                console.error(e);
            });
        // return console.log(song)

        if (channel !== null) {
            channel.join().then(async connection => {

                try {
                    const stream = ytdl(`https://www.youtube.com/watch?v=${song[0].id}`, {
                        filter: 'audioonly'
                    });
                    const dispatcher = connection.play(stream)
                    await dispatcher.on('finish', () => channel.leave());
                } catch (error) {
                    return message.channel.send("That video was not found.");
                }
            });
        } else {
            return message.channel.send("You are not in a voice channel.");
        }
    }
}