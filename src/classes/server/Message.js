const Channel = require("./Channel");
const utils = require("../../utils/ServerUtils")

module.exports = class Message {
    constructor(data, client) {
        this.client = client;
        this.id = data.d.message.id;

        this.channel = new Channel(data.d.message.channelId, client)
    }

    async addReaction(reactionId) {
        await utils.addReactionToMessage(this.channel.id, this.id, reactionId, this.client.token)
    }

    async removeReaction(reactionId) {
        utils.removeReactionToMessage(this.channel.id, this.id, reactionId, this.client.token)
    }

}