describe('Environments', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  test('instancia com sucesso quando variáveis existem', () => {
    jest.isolateModules(() => {
      process.env.MONGODB_URL = 'mongo';
      process.env.MONGODB_DB_NAME = 'db';
      process.env.NAME_API = 'name';
      process.env.SECRET = 'secret';
      process.env.PORT = '3000';
      process.env.NAME_APPLICATION = 'app';
      const env = require('../Environments').default;
      expect(env).toBeDefined();
    });
  });

  test('lança erro quando alguma variável falta', () => {
    jest.isolateModules(() => {
      process.env = {} as any;
      expect(() => require('../Environments').default).toThrow();
    });
  });
});