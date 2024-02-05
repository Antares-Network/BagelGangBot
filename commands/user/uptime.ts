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
		const time = client.uptime !== null ? client.uptime : 0;
		const days = Math.floor(time / 86400000);
		const hours = Math.floor(time / 3600000) % 24;
		const minutes = Math.floor(time / 60000) % 60;
		const seconds = Math.floor(time / 1000) % 60;

		// Embed values
		const color = "#0099ff";
		const title = "Bot Uptime";
		const description = `I have been online for ${days}d ${hours}h ${minutes}m ${seconds}s`;
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
				`${chalk.green(`[COMMAND]`)} ${chalk.yellow(interaction?.user?.tag)} used the ${chalk.green(`/uptime`)} command in ${chalk.yellow(
					interaction?.guild?.name
				)}`
			)
		);
		return { embeds: [Embed] };
	},
} as CommandObject;
