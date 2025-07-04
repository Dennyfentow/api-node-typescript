export class CustomTimeoutException extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CustomTimeoutException.prototype);
    }

    getMessage() {
        return this.message;
    }
}