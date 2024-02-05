import { Client } from "discord.js";
import WOK from "wokcommands";

export default (instance: WOK) => {
	const client = instance.client;
	const statusOptions = [
		`/help | Ping: ${client.ws.ping}ms`,
		`V.${process.env.VERSION}`,
		`status.antaresnetwork.com`,
		`antaresnetwork.com/github`,
		`status.antaresnetwork.com`,
		`Antares Network Server Hosting`,
		"Hello! I'm BaseBot",
	];
	let counter = 0;

	const updateStatus = () => {
		client.user?.setPresence({
			status: "online",
			activities: [
				{
					name: statusOptions[counter],
				},
			],
		});

		if (++counter >= statusOptions.length) {
			counter = 0;
		}

		setTimeout(updateStatus, 1000 * 60 * 5);
	};
	updateStatus();
};

export const config = {
	dbName: "STATUS_CHANGER",
	displayName: "Status Changer",
};
