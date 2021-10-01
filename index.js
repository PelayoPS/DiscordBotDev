import DiscordJS, { Interaction } from 'discord.js'
import { Intents } from 'discord.js'
import { config } from 'dotenv'

config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')

    const guildId = '811605626068533278'
    const guild = client.guilds.cache.get(guildId)

    let commands

    if(guild) {
        commands = guild.commands
    } else {
        commands = commands.client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong'
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'number1',
                description: 'First argument',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'number2',
                description: 'Second argument',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]

    })
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()){
        return
    }

    const { commandName, options} = interaction

    if(commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: false,//if true only the one who used the command can see it
        })
    }
})

client.on('messageCreate', (message) => {
    if(message.content === 'ping') {
        message.reply({
            content: 'pong'
        })
    }
})



client.login(process.env.TOKEN)