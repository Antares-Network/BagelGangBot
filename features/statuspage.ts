import axios from "axios";
import { Client } from "discord.js";
import { isPropertyAccessChain } from "typescript";
import { isDocker } from "../utils/util";

export default (): void => {
	// Check if the bot is running in a docker container by checking if the env variable UPTIME_KUMA_CONTAINERIZED is true
	if (isDocker()) return;
	const updateStatus = async () => {
		// This function is called every 1 minutes and pings the network status page for uptime monitoring
		if (!process.env.UPTIME_KUMA_MONITOR_URL || !process.env.UPTIME_KUMA_MONITOR_ID) {
			return;
		}
		await axios.get(
			`https://${process.env.UPTIME_KUMA_MONITOR_DOMAIN}/api/push/${process.env.UPTIME_KUMA_MONITOR_ID}?msg=OK&ping=client.ws.ping`
		);
		setTimeout(updateStatus, 1000 * 60);
	};
	updateStatus().catch((err) => console.log(err));
};

export const config = {
	dbName: "STATUSPAGE_UPDATE",
	displayName: "Status Page Update",
};
