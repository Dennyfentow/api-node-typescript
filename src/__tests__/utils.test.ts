import { getInfoRequest, formatData, uniq } from '../utils/utils';
import logger from '../logger';

jest.mock('../logger');

describe('utils', () => {
  test('getInfoRequest logs headers and meta', () => {
    const mockedInfo = jest.spyOn(logger, 'info');
    const req: any = { url: '/x', ip: '1.2.3.4', headers: { a: 1 } };
    getInfoRequest(req as any);
    expect(mockedInfo).toHaveBeenCalledTimes(2);
  });

  test('formatData formats date with -3 hours (UTC)', () => {
    const date = new Date('2022-01-01T03:00:00.000Z');
    const formatted = formatData(date);
    expect(formatted).toBe('2022-01-01 00:00:00');
  });

  test('uniq removes duplicates', () => {
    expect(uniq([1, 1, 2, 3, 2])).toEqual([1, 2, 3]);
    expect(uniq(['a', 'a'])).toEqual(['a']);
  });
});