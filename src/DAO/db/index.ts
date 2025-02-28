import { Pool } from "pg";
import logger from "../../logger";

const pool = new Pool({
    host: 'localhost',
    user: 'user',
    database: 'database',
    password: 'pass',
    port: 5432,
    max: 15,
    application_name: 'api-node-typescript',
    log: ((messages) => { // logs pg
        logger.warn(messages);
    }),
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 10000,
    // query_timeout: 15000,
    // statement_timeout: 15000,
});
pool.on('error', (err, client) => {
    logger.error('database error: ');
    logger.error(err);
    console.log(err);
    logger.error(err.message);
    logger.error(err.stack);
    logger.error('cliente: ');
    logger.error(client);
});

const runQuery = (text: string, params: unknown[]) => pool.query(text, params);
export { 
    pool,
    runQuery
};