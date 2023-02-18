const Channel = require("../server/Channel");

module.exports = class ChatMessageCreated {
    constructor(data, client) {
        this.client = client;

        this.id = data.d.message.id;
        this.type = data.d.message.type;
        this.serverId = data.d.message.serverId;
        this.channelId = data.d.message.channelId;
        this.deletedAt = data.d.message.deletedAt;

        this.channel = new Channel(this.channelId, client)
    }
}