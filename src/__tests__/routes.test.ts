import request from 'supertest';
import server from '../server';
import * as userDAO from '../DAO/userDAO';
import jwt from 'jsonwebtoken';

jest.mock('../DAO/userDAO');

const mockedDAO = userDAO as jest.Mocked<typeof userDAO>;

const SECRET = process.env.SECRET as string;

describe('routes', () => {
  afterAll(() => {
    // @ts-ignore
    server.close && server.close();
  });

  test('POST /login unauthorized when missing body', async () => {
    const res = await request(server).post('/login').send({});
    expect(res.status).toBe(401);
    expect(res.body.auth).toBe(false);
  });

  test('POST /login success', async () => {
    const userInfo: any = { id: 1, user: 'u', full_name: 'name', user_type: 'type', secret: '' };
    mockedDAO.getUser.mockResolvedValueOnce(userInfo);
    mockedDAO.updateSecretUser.mockResolvedValueOnce({ ...userInfo, secret: 'abc' } as any);

    const res = await request(server).post('/login').send({ username: 'User', password: 'pass' });
    expect(res.status).toBe(201);
    expect(res.body.auth).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  test('GET /logout requires auth', async () => {
    const res = await request(server).get('/logout');
    expect(res.status).toBe(401);
  });

  test('GET /logout success', async () => {
    mockedDAO.dropSecretUser.mockResolvedValueOnce(true);
    const token = jwt.sign({ id: 1, user: 'u' } as any, SECRET);

    const res = await request(server)
      .get('/logout')
      .set('x-access-token', token);

    expect(res.status).toBe(200);
    expect(res.body.result).toBe(true);
  });
});