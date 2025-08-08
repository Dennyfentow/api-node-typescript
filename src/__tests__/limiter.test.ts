jest.mock('../server', () => ({
  ipToManyRequests: new Map<string, string>(),
}));

// Mock controlado do express-rate-limit para acionar o handler na 6ª chamada
const mockRateLimit = jest.fn().mockImplementation((opts: any) => {
  let count = 0;
  return (req: any, res: any, next: any) => {
    count++;
    if (count <= 5) {
      next();
    } else {
      opts.handler(req, res);
    }
  };
});

jest.mock('express-rate-limit', () => ({
  __esModule: true,
  default: mockRateLimit,
}));

import { limiter } from '../limiter';

function makeReq(ip = '1.1.1.1') {
  const req: any = {
    ip,
    headers: {},
    get: () => undefined,
    socket: { remoteAddress: ip },
    app: { get: () => false },
  };
  return req;
}

function makeRes() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('limiter', () => {
  test('permite até 5 e bloqueia a 6ª requisição', () => {
    const next = jest.fn();

    for (let i = 0; i < 5; i++) {
      const req = makeReq();
      const res = makeRes();
      limiter(req, res as any, () => { next(); });
    }
    expect(next).toHaveBeenCalledTimes(5);

    const sixthReq = makeReq();
    const sixthRes = makeRes();
    limiter(sixthReq, sixthRes as any, () => {});
    expect(sixthRes.status).toHaveBeenCalledWith(409);
    expect(sixthRes.send).toHaveBeenCalledWith('Too many requests');
  });
});