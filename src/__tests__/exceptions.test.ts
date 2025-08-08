import { CustomTimeoutException } from '../models/exceptions/timeout-exception';
import { UnauthorizedException } from '../models/exceptions/unauthorized.exception';

describe('exceptions', () => {
  test('CustomTimeoutException getMessage', () => {
    const e = new CustomTimeoutException('timeout');
    expect(e).toBeInstanceOf(Error);
    expect(e.getMessage()).toBe('timeout');
  });

  test('UnauthorizedException', () => {
    const thrower = () => { throw new UnauthorizedException('x'); };
    expect(thrower).toThrow('x');
  });
});