module.exports = class ChatMessageCreated {
    constructor(data, client) {
        this.client = client;

        this.serverId = data.d.serverId;
        this.userId = data.d.member.user.id;
        this.joinedAt = data.d.joinedAt;

    }
}