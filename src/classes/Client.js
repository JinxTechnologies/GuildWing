import('ws');

const WebSocket = require("ws");

const { InvalidEvent } = require("../errors/InvalidEvent")
const { InvalidToken } = require("../errors/InvalidToken");
const ChatMessageCreated = require('./events/ChatMessageCreated');
const ChatMessageDelete = require('./events/ChatMessageDelete');
const ServerMemberJoin = require('./events/ServerMemberJoin');
const ServerMemberRemoved = require('./events/ServerMemberRemoved');

const Server = require('./server/Server');
const Channel = require('./server/Channel');

async function fireEvent(functions, data, client) {
    for (var x = 0; x < functions.length; x++) {
        functions[x](data, client);
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
                Authorization: `Bearer ${this.token}`,
                "User-Agent": "GuildWing"
            }
        });

        this.socket.on(`message`, (data) => {
            const json = JSON.parse(data);

            // Ready Event
            if (!json.t && json.d.user) {

                this.id = json.d.user.id;
                this.botId = json.d.botId;
                this.username = json.d.user.name;
                if (!this.preEvents.has("ready"))
                    return;
                fireEvent(this.preEvents.get("ready"), this)
                return;
            }

            // Other Events
            switch (json.t) {
                case "ChatMessageCreated": {
                    if (!this.preEvents.has("messagecreated"))
                        break;
                    const message = new ChatMessageCreated(json, this)
                    fireEvent(this.preEvents.get("messagecreated"), message, this)
                    break;
                }

                case "ChatMessageDeleted": {
                    if (!this.preEvents.has("messagedelete"))
                        break;
                    const message = new ChatMessageDelete(json, this)
                    fireEvent(this.preEvents.get("messagedelete"), message, this)
                    break;
                }

                case "ServerMemberJoined": {
                    if (!this.preEvents.has("servermemberjoin"))
                        break;
                    const join = new ServerMemberJoin(json, client)
                    fireEvent(this.preEvents.get("servermemberjoin"), join, this)
                    break;
                }

                case "ServerMemberRemoved": {
                    if (!this.preEvents.has("servermemberleave"))
                        break;
                    const leave = new ServerMemberRemoved(json, client)
                    fireEvent(this.preEvents.get("servermemberleave"), leave, this)
                    break;
                }


                // default: {
                //     console.log("Found an event that has not been handled. Event: " + json.t)
                // }
            }


        })

        this.running = true;
    }

    on(event, next) {
        const eventName = event.toLowerCase()
        if (this.preEvents.has(eventName)) {
            this.preEvents.get(eventName).push(next);
        } else {
            this.preEvents.set(eventName, [])
            this.preEvents.get(eventName).push(next);
        }
    }

    getChannelById(channelId) {
        return new Channel(channelId, this)
    }

    getServerById(serverId) {
        return new Server(serverId, this)
    }


}