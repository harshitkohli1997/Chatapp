[{
    
}]

//how to declare class
// class ClassName(first letter upper case)
class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
       var user =  {id, name, room}
       this.users.push(user);
       return user;
    }
}

module.exports = {Users};