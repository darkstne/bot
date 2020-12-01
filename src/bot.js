const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(__dirname + `/commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log("Bot Online!");
    client.user.setActivity(`play.totalfreedom.me`, {
        type: "PLAYING"
    });
});

let prefix = config.prefix;

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments.`;
        let usage = `Usage: \`${prefix}${command.name} ${command.usage}\``

        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColorError)
            .setDescription(`${reply}\n\n${usage}`)

        return message.channel.send(embed);
    }

    try {
        command.execute(message, args);
    } catch (error) {

        console.error(error);

    }
});

client.login(config.token);