import DiscordJS, {Collection, Intents } from 'discord.js';
import { config } from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import * as fs from 'fs';

config();

const allIntents = new Intents(32767);
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES
      ],
});


client.on('ready', () => {
    console.log("================");
    console.log('The bot is ready');
    console.log("================");

    const deploy_commands = require(`./deploy-commands.js`);
    deploy_commands.run();

    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    console.log(commandFiles)
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }

})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;
    
    try {
        await command.execute(interaction.client, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('messageCreate', (message) => {
    console.log(message.author.username + ":", message.content);
})




client.login(process.env.TOKEN);