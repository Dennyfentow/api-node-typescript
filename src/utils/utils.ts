import logger from "../logger";
import { Req } from "../types/types";

export function getInfoRequest(req: Req): void {
    logger.info(`Req Info - url: ${req.url} | ip: ${req.ip} | headers: `);
    logger.info(req.headers);
}

export const formatData = (dataHoraAPI: Date) => {
    try {
        // "2022-01-01T03:00:00.000Z";
        dataHoraAPI.setHours(dataHoraAPI.getHours() -3);
        const dataIsoString = dataHoraAPI.toISOString();        
        return dataIsoString.substring(0,10) + ' ' + dataIsoString.substring(11,19);
    } catch (err) {
        logger.error(err);
    }
};

export function uniq<T>(a: T[]) {
    return Array.from(new Set(a));
 }