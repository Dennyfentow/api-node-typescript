export class BaseUser {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    toString() {
        return `BaseUser{username: ${this.username}, password: ${this.password}}`;
    }
}