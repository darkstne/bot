const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Help command',
    aliases: ['commands', '?'],
    usage: '[command name]',
    execute(message, args) {
        const {
            commands
        } = message.client;

        const prefix = config.prefix;

        if (!args.length) {

            const allCommands = commands.map(command => command.name);
            const allDescriptions = commands.map(command => command.description);
            const hide = commands.map(command => command.hide);
            const staff = commands.map(command => command.staff);
            const voice = commands.map(command => command.voice);

            let data = [];
            for (var i = 0; i < allCommands.length; i++) {
                if (hide[i] || staff[i] || voice[i]) continue;
                data.push(`\`${allCommands[i]}\` - ${allDescriptions[i]}`);
            }

            let staffCommands = [];
            for (var i = 0; i < staff.length; i++) {
                if (staff[i]) {
                    staffCommands.push(`\`${allCommands[i]}\` - ${allDescriptions[i]}`);
                }
            }

            let voiceCommands = [];
            for (var i = 0; i < voice.length; i++) {
                if (voice[i]) {
                    voiceCommands.push(`\`${allCommands[i]}\` - ${allDescriptions[i]}`);
                }
            }
            const notes = [`- You can do \`${prefix}help [command name]\` to get more information on a command.`, "- If you notice any issues or would like something added, please visit the [GitHub](https://github.com/darkstne/darkstnebot)."];

            for (var i = 0; i < notes.length; i++) {
                notes.join('\n')
            }
            const embed = new Discord.MessageEmbed()
                .setColor('#00385C')
                .setTitle('Darkstone Bot Help Menu')
                .addFields({
                    name: "Prefix",
                    value: `\`${prefix}\``
                }, {
                    name: "Commands",
                    value: data,
                });

            if (staffCommands.length > 0) {
                embed.addFields({
                    name: "Staff Commands",
                    value: staffCommands,
                });
            }

            if (voiceCommands.length > 0) {
                embed.addFields({
                    name: "Voice Commands",
                    value: voiceCommands,
                });
            }

            if (notes.length > 0) {
                embed.addFields({
                    name: "Notes",
                    value: notes,

                })
            }
            return message.channel.send(embed);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`That command was not found. Do \`${prefix}help\` to get a list of commands.`);
            return message.channel.send(embed);
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`Command Info for \"${command.name}\"`)
            .setDescription(command.description);

        if (command.aliases) {
            embed.addFields({
                name: 'Alias(es)',
                value: command.aliases.join(', '),
            });
        }

        if (command.usage) {
            embed.addFields({
                name: 'Usage',
                value: `${prefix}${command.name} ${command.usage}`
            });
        }
        return message.channel.send(embed);
    }
}