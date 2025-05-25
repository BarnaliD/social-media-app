const User = require('../models/User');

class UserManager {
  constructor(userDb) {
    this.userDb = userDb;
    this.currentUser = null;
  }

  register(username, password) {
    if (this.userDb.getUser(username)) {
      throw new Error('User already exists');
    }
    const newUser = new User(username, password);
    this.userDb.saveUser(newUser);
    return newUser;
  }

  login(username, password) {
    const user = this.userDb.getUser(username);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    this.currentUser = user;
    return user;
  }

  changePassword(newPassword) {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }
    this.currentUser.password = newPassword;
    this.userDb.saveUser(this.currentUser);
  }
}

module.exports = UserManager;
