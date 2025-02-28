import jwt from 'jsonwebtoken';
import logger from '../logger';
import { Next, Req, Res } from "../types/types";

export function verificarJWT(req: Req, res: Res, next: Next): void {

    if (!req.headers['x-access-token']) {
        logger.error('Token not provided: \'' + req.url + '\' Ip: \'' + req.ip + '\'');
        res.status(401).json({ auth: false, message: 'No token provided.' });
        return;
    }
    const token = req.headers['x-access-token'] as string;

    jwt.verify(token, process.env.SECRET as string, function (err: jwt.VerifyErrors | null, decoded: unknown) {
        if (err) {
            logger.error('Url token authentication failed: \'' + req.url + '\' ip: \'' + req.ip + '\'');
            res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
            return;
        }

        // se tudo estiver ok, salva no request para uso posterior
        logger.info(`url: '${req.url}', ip: '${req.ip}' user: `);
        logger.info(decoded);
        res.locals.userInfo = decoded;
        next();
    });

}