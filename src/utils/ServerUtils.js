import('node-fetch');

const { RateLimited } = require("../errors/RateLimited")

async function sendMessage(channelId, message, token) {
    const response = await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
        body: JSON.stringify(message),
    });

    if (response.status == 429) {
        throw new RateLimited();
    }

    if (response.status != 201) {
        throw new InteractionFailed("Failed to reply to message. ChannelId: " + channelId)
    }
}

async function reply(channelId, message, messageId, token) {
    message.replyMessageIds = [messageId];
    const response = await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
        body: JSON.stringify(message),
    });

    if (response.status == 429) {
        throw new RateLimited();
    }

    if (response.status != 201) {
        throw new InteractionFailed("Failed to reply to message. ChannelId: " + channelId + " MessageId: " + messageId)
    }
}

async function getChannel(channelId, token) {
    return await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
    });
}

async function getServer(serverId, token) {
    return await fetch(`https://www.guilded.gg/api/v1/servers/${serverId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
    });
}

async function addReactionToMessage(channelId, messageId, emoteId, token) {

    const InvalidReaction = require("../errors/InvalidReaction")

    const response = await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/content/${messageId}/emotes/${emoteId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
    });

    if (response.status == 404) {
        throw new InvalidReaction(emoteId)
    }
}

async function removeReactionToMessage(channelId, messageId, emoteId, token) {
    const InvalidReaction = require("../errors/InvalidReaction")

    const response = await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/content/${messageId}/emotes/${emoteId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
    });

    if (response.status == 404) {
        throw new InvalidReaction(emoteId)
    }
}

async function getMessageById(channelId, messageId, token) {
    return await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
    });
}

async function deleteMessage(channelId, messageId, token) {
    fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": "GuildWing"
        }
    });
}

async function kickMember(serverId, userId, token) {
    fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/members/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": "GuildWing"
        }
    });
}

async function banMember(serverId, userId, token, reason) {
    if (reason) {
        fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "GuildWing"
            },
            body: JSON.stringify({
                reason: reason
            })
        });
    } else {
        fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "GuildWing"
            }
        });
    }

}

async function getBan(userId, serverId, token) {
    return await fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "GuildWing"
        },
    });
}

async function unbanMember(serverId, userId, token) {
    fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": "GuildWing"
        }
    });
}

module.exports = {
    deleteMessage,
    sendMessage,
    reply,
    getChannel,
    getMessageById,
    getServer,
    kickMember,
    banMember,
    getBan,
    unbanMember,
    addReactionToMessage,
    removeReactionToMessage
}