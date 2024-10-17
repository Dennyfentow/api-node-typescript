import logger from './logger';
import server from './server';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3355;

server.listen(PORT, () => {
    logger.info(`..::  ${process.env.NAME_API || 'api-node-typescript'} ::..`);
    logger.info('listening on port: ' + PORT);
});