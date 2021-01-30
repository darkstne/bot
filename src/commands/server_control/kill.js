const nodeactyl = require('nodeactyl-v1-support')
const node = nodeactyl.Client
const config = require(__dirname + '/../../../config.json')



module.exports = {
    name: 'kill',
    description: 'Kill a server',
    staff: true,
    usage: '<creative/survival/lobby>',
    async execute(message, args) {
        
        let args1 = args.splice(0).join().toLowerCase();
        const server = ['creative', 'survival', 'lobby']

        if (!server.includes(args1)) return message.channel.send("Please input a valid server.")

        const roles = ['Executive', 'Developer', 'Admin'];

        let serverID;
        if (args1 === 'creative') {
            serverID = '98d98424'
        } else if (args1 === 'survival') {
            serverID = 'a584f37b'
        } else if (args1 === 'lobby') {
            serverID = 'cca9f577'
        }


        for (var i = 0; i < message.member._roles.length; i++) {
            if (!message.member.roles.cache.some(role => role.name === roles[i])) {
                continue;
            } else {
               node.login('https://panel.darkst.one/', config.APIKey, (logged_in, msg) => {
                    console.log(logged_in);
                    node.getAllServers()
                })

                return node.killServer(serverID)
                    .then((res) => {
                        message.channel.send(`${args1.toUpperCase()} has killed successfully.`);
                    })
                    .catch(err => {
                        message.channel.send("There was an error attempting to kill the server.");
                        console.log(err)
                    })
            }
        }
        message.channel.send("You do not have permission to do that!");

    }
}