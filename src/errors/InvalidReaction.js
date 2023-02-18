module.exports = class InvalidReaction extends Error {
    constructor(reactionId) {
        super(`${reactionId} is iver an invalid emoteId or the bot does not have access to the emote.`);
        this.name = "InvalidReaction";
    }
}