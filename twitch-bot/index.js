require("dotenv").config()
const tmi = require("tmi.js")
const {Rcon} = require("rcon-client")
const lootTable = require("./data/lootTable.json").table
const effectTable = require("./data/effectTable.json").effects
const hostileMobs = require("./data/hostileMobs.json").mobs

const twitchConfig = {
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN,
	},
	channels: [process.env.TWITCH_CHANNEL],
}
const rconConfig = {
	host: process.env.RCON_HOST,
	port: process.env.RCON_PORT,
	password: process.env.RCON_PASSWORD,
}

const twitchClient = new tmi.client(twitchConfig)
const rconClient = new Rcon(rconConfig)

twitchClient.connect()
rconClient.connect()

twitchClient.on("connected", () => {
	try {
		console.log("Bot is connected to Twitch!")
		rconClient.send("gamerule sendCommandFeedback false")
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

	if (message === "!heal") {
		const command = "effect give @a minecraft:instant_health 1 3"
		rconClient.send(command)
	}

	if (message === "!damage") {
		const command = "effect give @a minecraft:instant_damage 1 3"
		rconClient.send(command)
	}

	if (message === "!anvil") {
		const command = "execute as @a at @s run summon minecraft:anvil ~ ~1 ~"
		rconClient.send(command)
	}

	if (message === "!title") {
		const {_command, ...arg} = message.split(" ")

		const mcCommand = `title @a title {"text":"${arg}"}`
		rconClient.send(mcCommand)
	}

	if (message === "!givelight") {
		const command = "setblock @a ~ ~ ~ minecraft:light"
		rconClient.send(command)
	}

	if (message === "!creeper") {
		const command =
			"playsound minecraft:entity.creeper.primed ambient @a ~ ~ ~ 1 1 1"
		rconClient.send(command)
	}

	if (message === "!hostile") {
		const randomMob = Math.floor(Math.random() * hostileMobs.length)
		const command = `execute as @p at @s run summon ${hostileMobs[randomMob]} ~ ~ ~`
		rconClient.send(command)
	}

	if (message === "!thunder") {
		const command = `weather thunder`
		rconClient.send(command)
	}

	if (message === "!tnt") {
		const command =
			"execute as @a at @s run summon minecraft:tnt ~ ~2 ~ {fuse:50}"
		rconClient.send(command)
	}

	if (message === "!tough") {
		const command = "effect give @a minecraft:resistance 15 50 true"
		rconClient.send(command)
	}

	if (message === "!lava") {
		const command = "execute as @a at @s run setblock ~ ~2 ~ minecraft:lava"
		rconClient.send(command)
	}

	if (message === "!water") {
		const command =
			"execute as @a at @s run setblock ~ ~2 ~ minecraft:water"
		rconClient.send(command)
	}

	if (message === "!clearhand") {
		const command =
			"item replace entity @a weapon.mainhand with minecraft:air"
		rconClient.send(command)
	}

	if (message === "!slowdown") {
		const command = "effect give @a slowness 15 255 true"
		rconClient.send(command)
	}

	if (message === "!night") {
		const command = "time set midnight"
	}

	if (message === "!lightning") {
		const command =
			"execute as @a at @s run summon minecraft:lightning_bolt ~ ~ ~"
		rconClient.send(command)
	}

	if (message === "!teleport") {
		const randomPosX = Math.floor(Math.random() * 2001 - 1000)
		const randomPosZ = Math.floor(Math.random() * 2001 - 1000)
		const command = `execute as @a run tp @s ~${randomPosX} ~ ~${randomPosZ}`
		rconClient.send(command)
	}

	if (message === "!totem") {
		const command =
			"item replace entity @a weapon.offhand with minecraft:totem_of_undying"
		rconClient.send(command)
	}

	if (message === "!clear") {
		const command = "clear @a"
		rconClient.send(command)
	}

	if (message === "!mlg") {
		const command =
			"item replace entity @a weapon.mainhand with minecraft:water_bucket"
		const command1 = "tp @a ~ ~150 ~"

		rconClient.send(command)
		rconClient.send(command1)
	}
})

process.on("exit", () => {
	if (rconClient) rconClient.disconnect()
	if (twitchClient) twitchClient.disconnect()
})
