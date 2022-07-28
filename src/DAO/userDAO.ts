import logger from '../logger';
import { BaseUser } from '../models/base-user';
import { UserInfo } from '../models/user-info';
import { TypeErrors } from '../enums/type-errors';
import { UnauthorizedException } from '../models/exceptions/unauthorized.exception';
import { runQuery } from './db';
import { v4 as uuidv4 } from 'uuid';

// TODO: implementar a utilização do JWT futuramente
const getUser = async (user: BaseUser): Promise<UserInfo | null> => {
    const sql = `<CONSULTA GET USER>`;

    const params: any[] = [user.username, user.password];
    try {
        const queryResult = await runQuery(sql, params);

        const usersInfo = queryResult.rows as UserInfo[];
        if (usersInfo.length > 0 && usersInfo[0]) {
            const userInfo = usersInfo[0];
            logger.info('usuario logado: ');
            logger.info(usersInfo[0]);
            return userInfo;
        }
    } catch (e: any) {
        logger.error('Erro ao buscar o usuário: ' + e.message);
        logger.error({ e });
        console.error(e);
    }

    throw new UnauthorizedException(TypeErrors.unauthorized_user);

}

const updateSecretUser = async (userInfoUpdate: UserInfo): Promise<UserInfo | null> => {
    const sql = `<CONSULTA UPDATE SECRET>`;
    const secret: string = uuidv4();
    const params: any[] = [secret, userInfoUpdate.id]
    try {

        await runQuery(sql, params);
        userInfoUpdate.secret = secret;
        return userInfoUpdate;
    } catch (e: any) {
        logger.error('Erro na atualização do secret: ' + e.message);
        logger.error({ e });
        console.error(e);
        return null;
    }


};

const dropSecretUser = async (id: number): Promise<boolean> => {
    const sql = `<CONSULTA DROP SECRECT USER>`;
    const params: any[] = [id];
    try {
        await runQuery(sql, params);
        return true;
    } catch (e: any) {
        logger.error('Erro na remoção do secret: ' + e.message);
        logger.error({ e });
        console.error(e);
        return false;
    }
};

export {
    getUser,
    updateSecretUser,
    dropSecretUser
}