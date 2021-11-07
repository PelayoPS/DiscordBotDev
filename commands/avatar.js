const DiscordJS = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`avatar`)
        .setDescription(`Muestra tu avatar con tamaño 1024 (todos podrán ver esta respuesta)`)
        .addUserOption(option => option.setName('user').setDescription('The user')),
    async execute(client, interaction) {
        let user = interaction.options.getUser('user');
        if (user == null) {
            user = interaction.user;
        }
        const embed = new DiscordJS.MessageEmbed()
            .setImage(user.avatarURL({ format: `png`, dynamic: true, size: 1024 }))
            .setFooter(`Avatar de ${user.tag}`)
            .setColor(`#01a330`);
        return interaction.reply({ embeds: [embed] });
    },
};