const DiscordJS = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(client, interaction) {
        let ping = Math.floor(client.ws.ping);
        const embed = new DiscordJS.MessageEmbed()
            .setTitle("🏓 Pong!")
            .setColor("RANDOM")
            .setDescription(`😎 API: ${ping}ms`);
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};