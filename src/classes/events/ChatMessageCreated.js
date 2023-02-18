const Channel = require("../server/Channel");
const utils = require("../../utils/ServerUtils");
const Server = require("../server/Server");

module.exports = class ChatMessageCreated {
    constructor(data, client) {
        this.client = client;

        this.id = data.d.message.id;
        this.type = data.d.message.type;
        this.content = data.d.message.content;

        this.serverId = data.d.message.serverId;
        this.server = new Server(this.serverId, client)

        this.channelId = data.d.message.channelId;

        this.channel = new Channel(this.channelId, client)
    }

    delete() {
        utils.deleteMessage(this.channelId, this.id, this.client.token);
    }
}