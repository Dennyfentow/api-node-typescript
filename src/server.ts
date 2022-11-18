import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Next, Req, Res } from "./types/types";
import logger from "./logger";
import routers from "./routes/route";
import { getInfoRequest } from "./utils/utils";
import rateLimit from 'express-rate-limit';

if (!process.env.PORT) {
    logger.error('No PORT environment variable');
    process.exit(1);
}


const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());
const ipToManyRequests = new Map<string, string>();

// const allowlist = [''];
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // Limit each IP to 5 requests per `window` (here, per 1 second)
    message: 'Too many requests',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // skip: (request, _) => allowlist.some(someIp => someIp == request.ip),
    handler: function(req: Req, res: Res) {
        if(!ipToManyRequests.has(req.ip)) {
            ipToManyRequests.set(req.ip, req.ip);
            logger.error('to many requests: ' + req.ip);
        }
        res.status(409).send('Too many requests');
    }
});

server.use(limiter);
server.use(routers);
//Tratando error de rota
server.use((req, res) => {
    logger.error("route not found: ");
    getInfoRequest(req);
    res.status(404).json({ error: true });
});

server.use((error: any, req: Req, res: Res, next: Next) => {
    logger.error('Middleware error, some wrong parameter in get');
    logger.error("url: '" + req.url + "' IP: '" + req.ip + "' headers: ");
    logger.error(req.headers);
    res.status(500).json({ error: true });
});

export default server;