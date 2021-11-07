const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
exports.run = function get_commands() {
	const commands = [];
	const commandFiles = fs
		.readdirSync("./commands")
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

	rest
		.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID
			),
			{ body: commands }
		)
		.then(() => console.log("Comandos actualizados correctamente."))
		.catch(console.error);
}