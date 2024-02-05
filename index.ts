// Import packages from NPM
import { Client, IntentsBitField } from "discord.js";
import WOK from "wokcommands";
import path from "path";
import chalk from "chalk";
import dotenv from "dotenv";
import { isDocker } from "./utils/util";

// import all environment variables from .env file
dotenv.config();

// Create a new Discord client
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.DirectMessages,
	],
});

client.on("ready", () => {
	if (client.user) {
		console.log(chalk.green(`Logged in as ${client.user.tag}!`));
		if (isDocker()) console.log(chalk.blueBright(`Running in a Docker container!`));
		console.log(chalk.yellow.bold(`I am running version: ${process.env.VERSION}`));
	}
	// Set up the WOKCommands instance
	new WOK({
		client,
		commandsDir: path.join(__dirname, "commands"),
		featuresDir: path.join(__dirname, "features"),
		events: { dir: path.join(__dirname, "events") },
		mongoUri: String(process.env.MONGODB_URI),
		disabledDefaultCommands: ["help", "language"],
		botOwners: ["603629606154666024"],
	});
});
// Catch all errors that are not handled well and just dump to the console. THis will be changed later but for now it's fine.
client.on("error", console.error);
client.on("warn", (e) => console.warn(e));
process.on("unhandledRejection", (promise, reason) => {
	console.error("Unhandled promise rejection:", promise, "\nreason", reason);
});

// Login to Discord with the bot token and display an error if it fails.
client.login(process.env.BOT_TOKEN).catch((error) => {
	console.error(chalk.red.bold(`There was an error connecting to the Discord API`));
	console.error(error);
	process.exit(1);
});

// Exit gracefully and print the exit code.
process.on("exit", (code) => {
	console.log("Now exiting...");
	console.log(`Exited with status code: ${code}`);
});
