import jwt from 'jsonwebtoken';
import logger from '../logger';
import { Next, Req, Res } from "../types/types";

export function verificarJWT(req: Req, res: Res, next: Next) {

    if (!req.headers['x-access-token']) {
        logger.error('Token not provided: \'' + req.url + '\' Ip: \'' + req.ip + '\'');
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
    const token = req.headers['x-access-token'] as string;

    jwt.verify(token, process.env.SECRET as string, function (err: any, decoded: any) {
        if (err) {
            logger.error('Falha na authenticação do token url: \'' + req.url + '\' ip: \'' + req.ip + '\'');
            return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' })
        }

        // se tudo estiver ok, salva no request para uso posterior
        logger.info(`url: '${req.url}', ip: '${req.ip}' user: `);
        logger.info(decoded);
        res.locals.userInfo = decoded;
        next();
    });

}