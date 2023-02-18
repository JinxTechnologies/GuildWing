class RateLimited extends Error {
    constructor() {
        super("Guild's API has rated limited you. You will not beable to create a request until the ratelimit is over.");
        this.name = "RateLimited";
    }
}