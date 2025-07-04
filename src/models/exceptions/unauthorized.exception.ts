export class UnauthorizedException extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}