const DiscordJS = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(client, interaction) {
        run(client, interaction);
    }
};

async function run(client, interaction) {
    try {
        const m = await interaction.channel.send("Pinging...");
        const embed = new DiscordJS.MessageEmbed()
            .setTitle("🏓 Pong!")
            .setColor("RANDOM")
            .addField("⌛ Latencia", `**${m.createdTimestamp - interaction.createdTimestamp}ms**`)
            .addField("😎 API", `**${Math.floor(client.ws.ping)}ms**`);
        m.edit({ embeds: [embed] });
        interaction.reply({
            content: "Done",
            ephemeral: true,
        });
    } catch (error) {
        return interaction.channel.send(`Algo pasó sry: ${error.message}`);
    } 
}