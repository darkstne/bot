const fs = require('fs');
const Discord = require('discord.js');
const util = require('minecraft-server-util');
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
    client.user.setActivity(`you.`, {
        type: "WATCHING"
    });
});

let prefix;

client.on('message', async message => {
    let prefix = config.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {

        console.error(error);

    }
});

client.login(config.token);