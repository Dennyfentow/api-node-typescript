import { verificarJWT } from '../auth/verifyJWT';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET as string;

describe('verificarJWT', () => {
  test('retorna 401 quando não há token', () => {
    const req: any = { headers: {}, url: '/x', ip: '::1' };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn(), locals: {} };
    const next = jest.fn();

    verificarJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ auth: false, message: 'No token provided.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('retorna 401 para token inválido', () => {
    const req: any = { headers: { 'x-access-token': 'invalid' }, url: '/x', ip: '::1' };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn(), locals: {} };
    const next = jest.fn();

    verificarJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('segue com next para token válido', done => {
    const payload = { id: 1, user: 'u' } as any;
    const token = jwt.sign(payload, SECRET);

    const req: any = { headers: { 'x-access-token': token }, url: '/x', ip: '::1' };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn(), locals: {} };

    const next = () => {
      expect(res.locals.userInfo).toBeDefined();
      done();
    };

    verificarJWT(req, res, next as any);
  });
});