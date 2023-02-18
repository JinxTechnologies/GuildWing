# GuildWing
GuildWing is a free, open-source library for creating guilded bots that aims to make bot development accessible to anyone, regardless of their level of experience - from beginners to experts. Currently, GuildWing is in its alpha release phase, which implies that certain features may not be available. Nevertheless, you may suggest features that you would like to see added to the library by joining our Guilded server, and we will be delighted to accommodate your requests.

## Installation

Use npm to install GuildWing into your projects

```bash
npm install guildwing
```

## Usage

```javascript
const { Client } = require("guildwing");

const client = new Client({
    token: "TOKEN_GOES_HERE"
});

// This event will fire when a message is sent in a channel
client.on("messageCreated", (message) => {
    if (message.content == "hi") {
        message.channel.send("Hello!")
    }

    if (message.content == "bad word") {
        message.delete()
    }

});

// This event will fire when the bot is online
client.on("ready", (client) => {
    console.log(client.username + " is ready!")
});

// This starts your guilded bot
client.login()
```

## Links
Guilded Server: https://www.guilded.gg/i/EwbAgqPp

NPM: https://www.npmjs.com/package/guildwing 

Github: https://github.com/TheRealShitDev/GuildWing 

## Licensing
GuildWing is licensed under [MIT](https://github.com/TheRealShitDev/GuildWing/blob/main/LICENSE)
