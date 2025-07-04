import logger from "../logger";
import { BaseUser } from "../models/base-user";
import jwt from 'jsonwebtoken';

import { Req, Res } from "../types/types";
import { dropSecretUser, getUser, updateSecretUser } from "../DAO/userDAO";
import { getInfoRequest } from "../utils/utils";
import { CustomTimeoutException } from "../models/exceptions/timeout-exception";
import { UnauthorizedException } from "../models/exceptions/unauthorized.exception";
import { AuthResponse } from "../models/responses/auth_response";
import { UserInfo } from "../models/user-info";

const authLogin = async (req: Req, res: Res) => {
  const user: BaseUser = req.body ? req.body : null;
  try {
    let userInfo: UserInfo| null = null;
    if (user && user.username && user.password) {
      user.username = user.username.toLowerCase();
      logger.info('search user: ' + user.username);
      userInfo = await getUser(user);
    }

    const hasSecret: boolean = process.env.SECRET ? true : false;
    if (userInfo != null && hasSecret) {
      const updatedUserInfo = await updateSecretUser(userInfo);
      if (updatedUserInfo != null) {
        const token = jwt.sign(updatedUserInfo, process.env.SECRET as string, {
          // expiresIn: (60 * 120) // expires in 2 hours
        });
        res.status(201).json(new AuthResponse(true, token, updatedUserInfo));
      } else {
        logger.error('Unable to update user secret: ');
        logger.error(userInfo);
        res.status(401).json(new AuthResponse(false));
      }

    } else {
      logger.info('unauthorized login: ');
      logger.error(user);
      getInfoRequest(req);
      res.status(401).json(new AuthResponse(false));
    }
  } catch (e) {
    if (e instanceof CustomTimeoutException) {
      getInfoRequest(req);
      logger.error('Erro timeout: ');
      logger.error(e);
      res.status(408).json(new AuthResponse(false));
    } else if (e instanceof UnauthorizedException) {
      logger.info('unauthorized user: ' + user.username);
      getInfoRequest(req);
      res.status(401).json(new AuthResponse(false));
    } else {
      console.log(e);
      logger.error('erro desconhecido');
      logger.error(e);
      res.status(500).json(new AuthResponse(false));
    }
  }
};

const authLogout = async (_: Req, res: Res) => {
  const userInfo: UserInfo = res.locals.userInfo;
  userInfo.secret = '';
  const result = await dropSecretUser(userInfo.id)
  res.json({result: result});
}

export {
  authLogin,
  authLogout
};


