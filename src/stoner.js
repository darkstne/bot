const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

function getDirectories() {
    return fs.readdirSync(__dirname + '/commands').filter(function subFolder(file) {
        return fs.statSync(__dirname + '/commands/' + file).isDirectory();
    });
}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const folder of getDirectories()) {
    const folderFiles = fs.readdirSync(__dirname + '/commands/' + folder).filter(file => file.endsWith('.js'));
    for (const file of folderFiles) {
        commandFiles.push([folder, file]);
    }
}

for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(__dirname + `/commands/${file[0]}/${file[1]}`);
    } else {
        command = require(__dirname + `/commands/${file}`);
    }
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Bot Online!");
    client.user.setActivity(`on darkst.one`, {
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
        const embed = new Discord.MessageEmbed()
        .setColor('#ff6961')
        .setTitle('ERROR')
        .setDescription("There was an error executing that command!")
        .addFields({
            name: 'Error',
            value: `\`\`\`${error}\`\`\``,
        }, {
            name: `Command`,
            value: `\`${message}\``,
        })
        .setTimestamp()
    return message.channel.send(embed);

    }
});

client.login(config.token);