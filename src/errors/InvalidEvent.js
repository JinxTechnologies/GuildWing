class InvalidEvent extends Error {
    constructor(event) {
        super(`The event provided ${event} is not a supported event.`);
        this.name = "InvalidEvent";
    }
}