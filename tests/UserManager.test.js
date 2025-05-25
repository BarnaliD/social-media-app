const UserManager = require('../controllers/UserManager');
const User = require('../models/User');

describe('UserManager', () => {
  let mockDb;
  let manager;

  beforeEach(() => {
    mockDb = {
      getUser: jest.fn(),
      saveUser: jest.fn()
    };
    manager = new UserManager(mockDb);
  });

  test('registers a new user', () => {
    mockDb.getUser.mockReturnValue(undefined);
    manager.register('test', '123');
    expect(mockDb.saveUser).toHaveBeenCalledWith(expect.any(User));
  });

  test('fails to register existing user', () => {
    mockDb.getUser.mockReturnValue(new User('test', '123'));
    expect(() => manager.register('test', '123')).toThrow('User already exists');
  });

  test('logs in valid user', () => {
    const user = new User('test', '123');
    mockDb.getUser.mockReturnValue(user);
    const result = manager.login('test', '123');
    expect(result).toEqual(user);
  });

  test('fails login with wrong password', () => {
    const user = new User('test', 'wrong');
    mockDb.getUser.mockReturnValue(user);
    expect(() => manager.login('test', '123')).toThrow('Invalid credentials');
  });

  test('changes password of logged-in user', () => {
    const user = new User('test', '123');
    manager.currentUser = user;
    manager.changePassword('456');
    expect(user.password).toBe('456');
    expect(mockDb.saveUser).toHaveBeenCalledWith(user);
  });
});
