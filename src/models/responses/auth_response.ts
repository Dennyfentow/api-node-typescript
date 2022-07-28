import { UserInfo } from "../user-info";

export class AuthResponse {
    auth: boolean;
    token?: string;
    userInfo?: UserInfo;
    constructor(auth: boolean, token?: string, userInfo?: UserInfo) {
        this.auth = auth;
        this.token = token;
        this.userInfo = userInfo;
    }
    
}