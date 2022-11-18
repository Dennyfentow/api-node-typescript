import logger from './logger';
import server from './server';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3355;

server.listen(PORT, () => {
    logger.info('..:: api-node-typescript ::..\n');
    logger.info('listening on port: ' + PORT);
});