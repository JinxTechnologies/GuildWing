class InvalidToken extends Error {
    constructor() {
        super("The token provided is invalid or is null");
        this.name = "InvalidToken";
    }
}