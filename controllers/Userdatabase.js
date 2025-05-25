class UserDatabase {
    constructor() {
      this.users = [];
    }
  
    getUser(username) {
      return this.users.find(u => u.username === username);
    }
  
    saveUser(user) {
      const existingIndex = this.users.findIndex(u => u.username === user.username);
      if (existingIndex !== -1) {
        this.users[existingIndex] = user;
      } else {
        this.users.push(user);
      }
    }
  }
  
  module.exports = UserDatabase;
  