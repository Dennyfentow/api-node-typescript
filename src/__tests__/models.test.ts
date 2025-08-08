import { BaseUser } from '../models/base-user';
import { UserInfo } from '../models/user-info';

describe('models', () => {
  test('BaseUser toString', () => {
    const user = new BaseUser('name', 'pass');
    expect(user.toString()).toContain('name');
  });

  test('UserInfo getters e setters', () => {
    const info = new UserInfo(1, 'u', 'full', 'type', 's');
    expect(info.id).toBe(1);
    expect(info.user).toBe('u');
    expect(info.full_name).toBe('full');
    expect(info.user_type).toBe('type');
    expect(info.secret).toBe('s');

    info.user = 'u2';
    info.full_name = 'full2';
    info.user_type = 'type2';
    info.secret = 's2';

    expect(info.user).toBe('u2');
    expect(info.full_name).toBe('full2');
    expect(info.user_type).toBe('type2');
    expect(info.secret).toBe('s2');

    expect(info.toString()).toContain('UserInfo{user:');
  });
});