import dotenv from 'dotenv';
dotenv.config({
    path: '.env_file'
});


class Environment {
    readonly MONGODB_URL;
    readonly MONGODB_DB_NAME;
    readonly NAME_API;
    readonly SECRET;
    readonly PORT;
    readonly NAME_APPLICATION;

    constructor() {
        if(!process.env.MONGODB_URL) {
            throw new Error('No MONGODB_URL environment variable');
        }
        if(!process.env.MONGODB_DB_NAME) {
            throw new Error('No MONGODB_DB_NAME environment variable');
        }
        if(!process.env.NAME_API) {
            throw new Error('No NAME_API environment variable');
        }
        if(!process.env.SECRET) {
            throw new Error('No SECRET environment variable');
        }
        if(!process.env.PORT) {
            throw new Error('No PORT environment variable');
        }
        if(!process.env.NAME_APPLICATION) {
            throw new Error('No NAME_APPLICATION environment variable');
        }

        this.MONGODB_URL = process.env.MONGODB_URL;
        this.MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
        this.NAME_API = process.env.NAME_API;
        this.SECRET = process.env.SECRET;
        this.PORT = process.env.PORT;
        this.NAME_APPLICATION = process.env.NAME_APPLICATION;
    }
}

const environment = new Environment();

export default environment;