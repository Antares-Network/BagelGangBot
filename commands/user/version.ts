import chalk from "chalk";
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { CommandObject, CommandType, CommandUsage } from "wokcommands";

export default {
	name: "version",
	category: "user",
	description: "Sends the bot's version",
	permissions: [PermissionFlagsBits.SendMessages],
	type: CommandType.SLASH,
	guildOnly: true,

	callback: ({ client, interaction }: CommandUsage) => {
		// Embed values
		const color = "#0099ff";
		const title = "Bot Version";
		const description = `I am running version: ${process.env.VERSION}`;
		const footer = `Delivered in: ${client.ws.ping}ms | BaseBot | ${process.env.VERSION}`;
		const footerIcon = "https://antaresnetwork.com/resources/BaseBot/icon.jpg";

		// Embed construction
		const Embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(title)
			.setDescription(description)
			.setFooter({ text: footer, iconURL: footerIcon });

		// Log the command usage
		console.log(
			chalk.blue(
				`${chalk.green(`[COMMAND]`)} ${chalk.yellow(interaction?.user?.tag)} used the ${chalk.green(
					`/version`
				)} command in ${chalk.yellow(interaction?.guild?.name)}`
			)
		);
		return { embeds: [Embed] };
	},
} as CommandObject;
