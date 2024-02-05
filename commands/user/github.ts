import chalk from "chalk";
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { CommandObject, CommandType, CommandUsage } from "wokcommands";

export default {
	name: "github",
	category: "user",
	description: "Sends an embed with a link to the github repo for the bot.",
	permissions: [PermissionFlagsBits.SendMessages],
	type: CommandType.SLASH,
	guildOnly: true,

	callback: ({ client, interaction }: CommandUsage) => {
		// Embed values
		const color = "#0099ff";
		const thumbnail = "https://antaresnetwork.com/resources/BaseBot/base-server-icon.png";
		const title = "Github";
		const description = "Click here to go to the BaseBot repo: \n https://github.com/Antares-Network/BaseBot";
		const footer = `Delivered in: ${client.ws.ping}ms | BaseBot | ${process.env.VERSION}`;
		const footerIcon = "https://antaresnetwork.com/resources/BaseBot/icon.jpg";

		// Embed construction
		const Embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(title)
			.setThumbnail(thumbnail)
			.setDescription(description)
			.setFooter({ text: footer, iconURL: footerIcon });

		// Log the command usage
		console.log(
			chalk.blue(
				`${chalk.green(`[COMMAND]`)} ${chalk.yellow(interaction?.user?.tag)} used the ${chalk.green(`/github`)} command in ${chalk.yellow(
					interaction?.guild?.name
				)}`
			)
		);
		return { embeds: [Embed] };
	},
} as CommandObject;
