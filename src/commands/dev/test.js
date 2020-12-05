const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'test',
    description: 'Test things out',
    hide: true,
    execute(message, args) {
        const table = new db.table('muted');
        table.delete('Item 1')

        console.log(table.all());
    }
}