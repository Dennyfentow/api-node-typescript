export class UserInfo {
    private _id: number;
    private _user: string;
    private _full_name: string;
    private _user_type: string;
    private _secret: string;

    constructor(id: number, user: string, full_name: string, user_type: string,
        secret: string) {
        this._id = id;
        this._user = user;
        this._full_name = full_name;
        this._user_type = user_type;
        this._secret = secret;
    }

    public get id(): number {
        return this._id;
    }

    public get user(): string {
        return this._user;
    }
    public set user(value: string) {
        this._user = value;
    }

    public get full_name(): string {
        return this._full_name;
    }
    public set full_name(value: string) {
        this._full_name = value;
    }

    public get user_type(): string {
        return this._user_type;
    }
    public set user_type(value: string) {
        this._user_type = value;
    }

    public get secret(): string {
        return this._secret;
    }
    public set secret(value: string) {
        this._secret = value;
    }

    toString() {
        return `UserInfo{user: ${this.user}, full_name: ${this.full_name}, user_type: ${this.user_type}`;
    }
}