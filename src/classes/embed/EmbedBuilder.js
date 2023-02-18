module.exports = class EmbedBuilder {

    constructor() {
        this.embed = {
            fields: []
        };
    }

    setColor(color) {
        this.embed.color = color;
        return this;
    }

    setTitle(title) {
        this.embed.title = title;
        return this;
    }

    setDescription(description) {
        this.embed.description = description;
        return this;
    }

    addField(field) {
        this.embed.fields.push(field);
        return this;
    }

    setTimeStamp() {
        this.embed.timestamp = new Date().toISOString();
        return this;
    }

    setFooter(footer) {
        this.embed.footer = footer;
        return this;
    }

    build() {
        return this.embed;
    }

}