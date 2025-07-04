import { Req, Res } from "./types/types";
import logger from "./logger";
import rateLimit from 'express-rate-limit';
import { ipToManyRequests } from "./server";

// const allowlist = [''];
export const limiter = rateLimit({
    windowMs: 1000,
    max: 5,
    message: 'Too many requests',
    standardHeaders: true,
    legacyHeaders: false,

    // skip: (request, _) => allowlist.some(someIp => someIp == request.ip),
    handler: function (req: Req, res: Res) {
        const reqIp = req.ip || 'não identificado';
        if (!ipToManyRequests.has(reqIp)) {
            ipToManyRequests.set(reqIp, reqIp);
            logger.error('to many requests: ' + reqIp);
        }
        res.status(409).send('Too many requests');
    }
});
