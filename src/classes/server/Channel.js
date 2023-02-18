const utils = require("../../utils/ServerUtils")

module.exports = class Channel {

    constructor(channelId, client) {
        this.id = channelId;
        this.client = client;

        (async () => {
            const data = await utils.getChannel(channelId, client.token);
            this.type = data.type;
        })();

    }

    async send(message) {
        await utils.sendMessage(this.id, message, this.client.token);
    }

}