import { Router } from 'express';
import { verificarJWT } from '../auth/verifyJWT';
import { authLogin, authLogout } from './authentication.route';


const routers = Router();

routers.post('/login', authLogin);
routers.get('/logout', verificarJWT, authLogout);

export default routers;