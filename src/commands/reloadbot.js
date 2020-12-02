module.exports = {
    name: 'reloadbot',
    description: 'Reloads the bot',
    aliases: ['rlb'],
    hide: true,
    async execute(message) {
        if (message.author.id !== '296401940089274369') return;
        await message.channel.send("Reloading...");
        process.exit();
    }
}