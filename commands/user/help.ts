import chalk from "chalk";
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { CommandObject, CommandType, CommandUsage } from "wokcommands";

export default {
	name: "help",
	category: "user",
	description: "Sends the help embed",
	permissions: [PermissionFlagsBits.SendMessages],
	type: CommandType.SLASH,
	guildOnly: true,

	callback: ({ client, interaction }: CommandUsage) => {
		const color = "#0099ff";
		const thumbnail = "https://antaresnetwork.com/resources/BaseBot/base-server-icon.png";
		const title = "Help and Commands List";
		const description = "Welcome to BaseBot! I am a base bot that has boilerplate functionality. Meant as a jumping off point for new bots.";
		const footer = `Delivered in: ${client.ws.ping}ms | BaseBot | ${process.env.VERSION}`;
		const footerIcon = "https://antaresnetwork.com/resources/BaseBot/icon.jpg";

		const Embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(title)
			.setThumbnail(thumbnail)
			.setDescription(description)
			.setFooter({ text: footer, iconURL: footerIcon });

		// Log the command usage
		console.log(
			chalk.blue(
				`${chalk.green(`[COMMAND]`)} ${chalk.yellow(interaction?.user?.tag)} used the ${chalk.green(`/help`)} command in ${chalk.yellow(
					interaction?.guild?.name
				)}`
			)
		);
		return { embeds: [Embed] };
	},
} as CommandObject;
