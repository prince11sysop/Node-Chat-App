//model to save users list even after reftreshing the tab
[{
    id: 'Prince@nitjsr',
    name: 'Prince',
    room: 'CSE'
  }]
  
  
  class Users {
    constructor () {
      this.users = [];
    }

    // when user joins the chat
    addUser (id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
    }

    // when user leaves the chat
    removeUser (id) {
      var user = this.getUser(id);
  
      if (user) {
        this.users = this.users.filter((user) => user.id !== id);
      }
      return user;
    }

    // to get id of online users
    getUser (id) {
      return this.users.filter((user) => user.id === id)[0]
    }

    //list of online users
    getUserList (room) {
      var users = this.users.filter((user) => user.room === room);
      var namesArray = users.map((user) => user.name);
  
      return namesArray;
    }
  }
  
  module.exports = {Users};
  