import('ws');

const { Server } = require('ws');
const WebSocket = require("ws");

const { InvalidToken } = require("../errors/InvalidToken");
const ChatMessageCreated = require('./events/ChatMessageCreated');
const ChatMessageDelete = require('./events/ChatMessageDelete');
const ServerMemberJoin = require('./events/ServerMemberJoin');
const ServerMemberRemoved = require('./events/ServerMemberRemoved');
const Channel = require('./server/Channel');

async function addEventListener(socket, name, gfunction, client) {
    switch (name.toLowerCase()) {
        case "messagecreated": {
            socket.on(`message`, async (data) => {
                const json = JSON.parse(data);
                if (json.t == "ChatMessageCreated") {
                    const message = await new ChatMessageCreated(json, client)
                    gfunction(message)
                }
            })
            break;
        }

        case "messagedelete": {
            socket.on(`message`, async (data) => {
                const json = JSON.parse(data);
                if (json.t == "ChatMessageDeleted") {
                    const message = await new ChatMessageDelete(json, client)
                    gfunction(message)
                }
            })
            break;
        }

        case "ready": {
            socket.on(`message`, async (data) => {
                const json = JSON.parse(data);
                if (!json.t) {
                    client.id = json.d.user.id;
                    client.botId = json.d.botId;
                    client.username = json.d.user.name;
                    gfunction(client)
                }
            })
            break;
        }

        case "servermemberjoin": {
            socket.on(`message`, async (data) => {
                const json = JSON.parse(data);
                if (json.t == "ServerMemberJoined") {
                    const join = new ServerMemberJoin(json, client)
                    gfunction(join)
                }
            })
            break;
        }

        case "servermemberleave": {
            socket.on(`message`, async (data) => {
                const json = JSON.parse(data);
                if (json.t == "ServerMemberRemoved") {
                    const leave = new ServerMemberRemoved(json, client)
                    gfunction(leave)
                }
            })
        }

        case "servermemberbanned": {

            break;
        }


    }
}

module.exports = class Client {
    constructor(settings) {
        if (!settings.token) {
            throw new InvalidToken();
        }
        this.socket = null;
        this.running = false;
        this.token = settings.token;

        this.preEvents = new Map();
    }


    async login() {
        this.socket = new WebSocket('wss://www.guilded.gg/websocket/v1', {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });

        // Adds pre events to the socket
        await this.preEvents.forEach((value, key) => {
            for (var x = 0; x < value.length; x++) {
                addEventListener(this.socket, key, value[x], this)
            }
        })

        this.running = true;
    }

    on(event, next) {
        if (this.running) {
            addEventListener(this.socket, event, next, this)
        } else {
            if (this.preEvents.has(event)) {
                this.preEvents.get(event).push(next);
            } else {
                this.preEvents.set(event, [])
                this.preEvents.get(event).push(next);
            }
        }
    }

    getChannelById(channelId) {
        return new Channel(channelId, this)
    }

    getServerById(serverId) {
        return new Server(serverId, this)
    }


}