require("dotenv").config()
const tmi = require("tmi.js")
const {Rcon} = require("rcon-client")
const lootTable = require("./data/lootTable.json").table
const effectTable = require("./data/effectTable.json").effects

const twitchConfig = {
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN,
	},
	channels: [process.env.TWITCH_CHANNEL],
}
const rconConfig = {
	host: "minecraft",
	port: 25575,
	password: process.env.RCON_PASSWORD,
}

const twitchClient = new tmi.client(twitchConfig)
const rconClient = new Rcon(rconConfig)

twitchClient.connect()
rconClient.connect()

twitchClient.on("connected", () => {
	try {
		console.log("Bot is connected to Twitch!")
	} catch (error) {
		console.error(error)
	}
})

twitchClient.on("message", (channel, tags, message, self) => {
	const displayName = tags["display-name"]
	const userColor = tags["color"]

	if (self) return // Ignore messages from the bot
	if (!message.startsWith("!")) {
		const regularMessage = `tellraw @a [{"text":"<${displayName}>", "color":"${userColor || "gold"}"}, {"text": "${message}"}']`

		rconClient.send(regularMessage)
	}

	if (message === "!loot") {
		const randomLoot = Math.floor(Math.random() * lootTable.length)
		const command = `loot give @a loot minecraft:${lootTable[randomLoot]}`

		rconClient.send(command)
	}

	if (message === "!effect") {
		const randomEffect = Math.floor(Math.random() * effectTable.length)
		const command = `effect give @a ${effectTable[randomEffect]} 30`
		rconClient.send(command)
	}
})

process.on("exit", () => {
	if (rconClient) rconClient.disconnect()
	if (twitchClient) twitchClient.disconnect()
})
