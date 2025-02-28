import { MongoClient } from 'mongodb'
import environment from '../../Environments';

const url = environment.MONGODB_URL;
const client = new MongoClient(url);

const dbName = environment.MONGODB_DB_NAME;

async function connectMongoDb() {
    await client.connect();
    const db = client.db(dbName);
    return db;
}

async function closeMongoDb() {
    await client.close();
}

export {
    connectMongoDb,
    closeMongoDb
}