import request from 'supertest';
import server from '../server';
import * as userDAO from '../DAO/userDAO';
import { CustomTimeoutException } from '../models/exceptions/timeout-exception';
import { UnauthorizedException } from '../models/exceptions/unauthorized.exception';

jest.mock('../DAO/userDAO');
const mockedDAO = userDAO as jest.Mocked<typeof userDAO>;

describe('authentication.route edge cases', () => {
  test('retorna 401 quando updateSecretUser retorna null', async () => {
    const userInfo: any = { id: 1, user: 'u', full_name: 'name', user_type: 'type', secret: '' };
    mockedDAO.getUser.mockResolvedValueOnce(userInfo);
    mockedDAO.updateSecretUser.mockResolvedValueOnce(null as any);

    const res = await request(server).post('/login').send({ username: 'User', password: 'pass' });
    expect(res.status).toBe(401);
  });

  test('retorna 408 quando ocorre CustomTimeoutException', async () => {
    mockedDAO.getUser.mockRejectedValueOnce(new CustomTimeoutException('timeout'));
    const res = await request(server).post('/login').send({ username: 'User', password: 'pass' });
    expect(res.status).toBe(408);
  });

  test('retorna 401 quando ocorre UnauthorizedException', async () => {
    mockedDAO.getUser.mockRejectedValueOnce(new UnauthorizedException('x'));
    const res = await request(server).post('/login').send({ username: 'User', password: 'pass' });
    expect(res.status).toBe(401);
  });

  test('retorna 500 quando ocorre erro desconhecido', async () => {
    mockedDAO.getUser.mockRejectedValueOnce(new Error('x'));
    const res = await request(server).post('/login').send({ username: 'User', password: 'pass' });
    expect(res.status).toBe(500);
  });
});