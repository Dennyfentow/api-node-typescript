import { Router } from 'express';
import { verificarJWT } from '../auth/verifyJWT';
import { limiter } from '../limiter';

import { authLogin, authLogout } from './authentication.route';


const routers = Router();

routers.use(limiter);
routers.post('/login', authLogin);
routers.get('/logout', verificarJWT, authLogout);

export default routers;