const utils = require("../../utils/ServerUtils")
const Channel = require('./Channel');

module.exports = class Server {
    constructor(serverId, client) {
        this.serverId = serverId;
        this.client = client;
    }

    kick(userId) {
        utils.kickMember(this.serverId, userId, this.client.token)
    }

    unban(userId) {
        utils.unbanMember(this.serverId, userId, this.client.token)
    }

    ban(userId, reason) {
        utils.banMember(this.serverId, userId, this.client.token, reason)
    }

    getBan(userId) {
        utils.getBan(userId, this.serverId, this.client.token)
    }

    getChannelById(channelId) {
        return new Channel(channelId, this.client)
    }



}
