import DiscordJS, { Client, Interaction, Collection, Intents, Options } from 'discord.js';
import { config } from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
import * as fs from 'fs';

config();

const allIntents = new Intents(32767);
const client = new DiscordJS.Client({
    intents: [
        allIntents
    ]
});

const guildId = '811605626068533278';
const clientId = '840554302492639242';

client.on('ready', () => {
    console.log("================");
    console.log('The bot is ready');
    console.log("================");

    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }


})

client.on('interactionCreate', async interaction => {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('messageCreate', (message) => {
    console.log(message.author.username + ":", message.content);
})




client.login(process.env.TOKEN);