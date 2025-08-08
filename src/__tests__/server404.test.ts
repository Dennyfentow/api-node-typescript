import request from 'supertest';
import server from '../server';

describe('server 404', () => {
  test('retorna 404 para rota inexistente', async () => {
    const res = await request(server).get('/rota-inexistente');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: true });
  });
});