export class UserInfo {
    private _id: number;
    private _usuario: string;
    private _nome_completo: string;
    private _tipo_usuario: string;
    private _secret: string;

    constructor(id: number, usuario: string, nome_completo: string, tipo_usuario: string,
        secret: string) {
        this._id = id;
        this._usuario = usuario;
        this._nome_completo = nome_completo;
        this._tipo_usuario = tipo_usuario;
        this._secret = secret;
    }

    public get id(): number {
        return this._id;
    }

    public get usuario(): string {
        return this._usuario;
    }
    public set usuario(value: string) {
        this._usuario = value;
    }

    public get nome_completo(): string {
        return this._nome_completo;
    }
    public set nome_completo(value: string) {
        this._nome_completo = value;
    }

    public get tipo_usuario(): string {
        return this._tipo_usuario;
    }
    public set tipo_usuario(value: string) {
        this._tipo_usuario = value;
    }

    public get secret(): string {
        return this._secret;
    }
    public set secret(value: string) {
        this._secret = value;
    }

    toString() {
        return `UserInfo{usuario: ${this.usuario}, nome_completo: ${this.nome_completo}, tipo_usuario: ${this.tipo_usuario}`;
    }
}