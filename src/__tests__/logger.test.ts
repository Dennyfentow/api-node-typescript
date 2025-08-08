import logger from '../logger';

describe('logger', () => {
  test('logger exporta métodos básicos', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
  });
});