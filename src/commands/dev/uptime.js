module.exports = {
    name: 'uptime',
    description: 'Get uptime of bot',
    hide: true,
    execute(message) {
        function msConversion(millis) {
            let sec = Math.floor(millis / 1000);
            let hrs = Math.floor(sec / 3600);
            sec -= hrs * 3600;
            let min = Math.floor(sec / 60);
            sec -= min * 60;

            sec = '' + sec;
            sec = ('00' + sec).substring(sec.length);

            if (hrs > 0) {
                min = '' + min;
                min = ('00' + min).substring(min.length);
                return message.channel.send(`I have been online for **${hrs}** hours, **${min}** minutes, and **${sec}** seconds.`);
            } else {
                return message.channel.send(`I have been online for **${min}** minutes and **${sec}** seconds.`);
            }
        }
        msConversion(message.client.uptime);
    }
}