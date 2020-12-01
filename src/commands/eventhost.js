module.exports = {
    name: 'eventhost',
    description: 'Add or remove event host role (Server Liaison)',
    args: true,
    staff: true,
    usage: '<user>',
    async execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'Server Liaison')) return;

        let user = message.mentions.members.first();
        if (!user) return message.channel.send("Please mention someone to add or remove the **Event Host** role.");
        let role = message.guild.roles.cache.find(role => role.name === 'Event Host');
        if (!role) return message.channel.send("The Event Host role does not exist.")

        if (user.roles.cache.some(role => role.name === 'Event Host')) {
            await user.roles.remove(role);
            return message.channel.send(`**Event Host** role has been removed from ${user}`)
        } else {
            await user.roles.add(role);
            return message.channel.send(`**Event Host** role has been added to ${user}.`)
        }

    }
}