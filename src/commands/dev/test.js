const nodeactyl = require('nodeactyl-v1-support')
const node = nodeactyl.Client

module.exports = {
    name: 'test',
    description: 'Test somethings',
    hide: true,
    async execute(message, args) {

        if (message.author.id !== '296401940089274369') return;



        node.login('https://panel.darkst.one/', 'ImTDud0eIJzcqF1bx7YqiNjk1I96on46XM5HtTgcYrzl3CEW', (logged_in, msg) => {
            console.log(logged_in); // return a Boolean (true/false) if logged in.
        })

        node.getServerInfo('a584f37b')
            .then(res => {
                console.log(res)
            })

    }
}