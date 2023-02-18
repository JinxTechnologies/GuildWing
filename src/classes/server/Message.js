const Channel = require("./Channel");

module.exports = class Message {
    constructor(data, client) {
        this.id = data.id;

        this.channel = new Channel(data.channelId, client)
    }
}