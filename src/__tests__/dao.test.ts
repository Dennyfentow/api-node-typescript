import { getUser, updateSecretUser, dropSecretUser } from '../DAO/userDAO';

jest.mock('../DAO/db', () => ({
  runQuery: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: () => 'fixed-secret',
}));

import { runQuery } from '../DAO/db';

const mockedRunQuery = runQuery as unknown as jest.Mock;

describe('userDAO', () => {
  beforeEach(() => {
    mockedRunQuery.mockReset();
  });

  test('getUser retorna usuário quando encontrado', async () => {
    mockedRunQuery.mockResolvedValueOnce({ rows: [{ id: 1, user: 'u', full_name: 'n', user_type: 't', secret: '' }] });
    const userInfo = await getUser({ username: 'u', password: 'p' } as any);
    expect(userInfo).toMatchObject({ id: 1, user: 'u' });
  });

  test('getUser lança Unauthorized quando não encontrado', async () => {
    mockedRunQuery.mockResolvedValueOnce({ rows: [] });
    await expect(getUser({ username: 'u', password: 'p' } as any)).rejects.toThrow();
  });

  test('updateSecretUser atualiza secret e retorna', async () => {
    mockedRunQuery.mockResolvedValueOnce({});
    const result = await updateSecretUser({ id: 1, secret: '' } as any);
    expect(result?.secret).toBe('fixed-secret');
  });

  test('dropSecretUser retorna true quando sucesso', async () => {
    mockedRunQuery.mockResolvedValueOnce({});
    await expect(dropSecretUser(1)).resolves.toBe(true);
  });

  test('dropSecretUser retorna false quando erro', async () => {
    mockedRunQuery.mockRejectedValueOnce(new Error('x'));
    await expect(dropSecretUser(1)).resolves.toBe(false);
  });
});