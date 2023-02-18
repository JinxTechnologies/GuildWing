import('node-fetch');

async function sendMessage(channelId, message, token) {
    await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message),
    });

}

async function getChannel(channelId, token) {
    return await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
}

async function getServer(serverId, token) {
    return await fetch(`https://www.guilded.gg/api/v1/servers/${serverId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
}

async function getMessageById(channelId, messageId, token) {

    return await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
}

async function deleteMessage(channelId, messageId, token) {
    fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

async function kickMember(serverId, userId, token) {
    fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/members/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

async function banMember(serverId, userId, token, reason) {
    if (reason) {
        fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                reason: reason
            })
        });
    } else {
        fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}

async function getBan(userId, serverId, token) {
    return await fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
}

async function unbanMember(serverId, userId, token) {
    fetch(`https://www.guilded.gg/api/v1/servers/${serverId}/bans/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

module.exports = {
    deleteMessage,
    sendMessage,
    getChannel,
    getMessageById,
    getServer,
    kickMember,
    banMember,
    getBan,
    unbanMember
}