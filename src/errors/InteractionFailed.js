class InteractionFailed extends Error {
    constructor(message) {
        super(message);
        this.name = "InteractionFailed";
    }
}