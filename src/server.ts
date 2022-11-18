import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Next, Req, Res } from "./types/types";
import logger from "./logger";
import routers from "./routes/route";
import { getInfoRequest } from "./utils/utils";


if (!process.env.PORT) {
    logger.error('No PORT environment variable');
    process.exit(1);
}


const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

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