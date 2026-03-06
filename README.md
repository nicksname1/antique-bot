# Usage

This bot runs on docker. So, you must have docker installed on the host machine first.

[Comprehensive Guide: Installing Docker and Docker Compose on Windows, Linux, and macOS](https://medium.com/@piyushkashyap045/comprehensive-guide-installing-docker-and-docker-compose-on-windows-linux-and-macos-a022cf82ac0b)

## Using Docker Compose

1. Create a new folder somewhere.
2. Create a new file called `docker-compose.yml` and put the code below. Make sure to replace the environment variables with real values.

```yml
services:
    twitch-bot:
        image: nickchunk/antique
        environment:
            TWITCH_USERNAME: "TWITCH_USERNAME"
            TWITCH_OAUTH_TOKEN: "TWITCH_OAUTH_TOKEN"
            TWITCH_CHANNEL: "TWITCH_CHANNEL"
            RCON_PASSWORD: "RCON_PASSWORD"
            RCON_HOST: "RCON_HOST"
            RCON_PORT: 25575 # By default RCON ports are 25575
```

- `TWITCH_USERNAME` is the name you want for the bot.

3. At the very basic level thats all you need for the bot. You can then just run file with docker desktop or `docker compose up -d` from the command line.
