import chalk from "chalk";
import DiscordJS, { PermissionFlagsBits, TextChannel } from "discord.js";
import { CommandObject, CommandType, CommandUsage } from "wokcommands";

export default {
	name: "say",
	category: "admin",
	description: "Sends an admin specified message to the specified channel.",
	permissions: [PermissionFlagsBits.ManageMessages],
	type: CommandType.SLASH,
	guildOnly: true,
	options: [
		{
			name: "content",
			description: "What to say",
			type: DiscordJS.ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "channel",
			description: "The channel to say the thing in",
			type: DiscordJS.ApplicationCommandOptionType.Channel,
			required: false,
		},
	],

	callback: ({ interaction }: CommandUsage) => {
		if (!interaction) return;
		const content = interaction.options.getString("content", true);
		const channel = (interaction.options.getChannel("channel") as TextChannel) || (interaction.channel as TextChannel);
		if (!content) {
			interaction?.reply({
				content: "You need to provide a content to say",
				ephemeral: true,
			});
			return;
		}
		channel.send(content);
		interaction.reply({
			content: `Message sent in <#${channel.id}>`,
			ephemeral: true,
		});

		// Log the command usage
		console.log(
			chalk.blue(
				`${chalk.green(`[COMMAND]`)} ${chalk.yellow(interaction?.user?.tag)} used the ${chalk.green(`/say`)} command in ${chalk.yellow(
					interaction?.guild?.name
				)}`
			)
		);
	},
} as CommandObject;
