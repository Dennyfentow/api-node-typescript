const connect = jest.fn().mockResolvedValue(undefined);
const dbFn = jest.fn().mockReturnValue({ name: 'db' });
const close = jest.fn().mockResolvedValue(undefined);

jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    connect,
    db: dbFn,
    close,
  })),
}));

import { connectMongoDb, closeMongoDb } from '../DAO/mongodb';

describe('DAO/mongodb', () => {
  test('connectMongoDb e closeMongoDb', async () => {
    const db = await connectMongoDb();
    expect(connect).toHaveBeenCalled();
    expect(dbFn).toHaveBeenCalled();
    expect(db).toEqual({ name: 'db' });
    await closeMongoDb();
    expect(close).toHaveBeenCalled();
  });
});