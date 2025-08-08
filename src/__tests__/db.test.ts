jest.mock('pg', () => {
  const onMock = jest.fn();
  const queryMock = jest.fn().mockResolvedValue({ rows: [] });
  ;(global as any).__pgOnMock = onMock;
  ;(global as any).__pgQueryMock = queryMock;
  return {
    Pool: class {
      query = queryMock;
      on = onMock;
    }
  };
});

import { runQuery } from '../DAO/db';

describe('DAO/db', () => {
  test('registra listener de erro e delega runQuery', async () => {
    const onMock = (global as any).__pgOnMock as jest.Mock;
    expect(onMock).toHaveBeenCalled();
    expect(onMock.mock.calls[0][0]).toBe('error');
    const result = await runQuery('SELECT 1', []);
    const queryMock = (global as any).__pgQueryMock as jest.Mock;
    expect(queryMock).toHaveBeenCalledWith('SELECT 1', []);
    expect(result).toEqual({ rows: [] });
  });
});