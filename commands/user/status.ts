import chalk from "chalk";
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { CommandObject, CommandType, CommandUsage } from "wokcommands";

export default {
	name: "status",
	category: "user",
	description: "Sends the statuspage link",
	permissions: [PermissionFlagsBits.SendMessages],
	type: CommandType.SLASH,
	guildOnly: true,

	callback: ({ client, interaction }: CommandUsage) => {
		// Embed values
		const color = "#0099ff";
		const title = "Status Page";
		const description = "CLick here to see the bot's status: \nhttps://status.antaresnetwork.com";
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
				`${chalk.green(`[COMMAND]`)} ${chalk.yellow(interaction?.user?.tag)} used the ${chalk.green(`/status`)} command in ${chalk.yellow(
					interaction?.guild?.name
				)}`
			)
		);
		return { embeds: [Embed] };
	},
} as CommandObject;
