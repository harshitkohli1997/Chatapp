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
    removeUSer (id ) {
        //return user that was removed
    }
    getUser (id) {

    }
    getUserList (room) {
        var users = this.users.filter(( user )=> {
   return user.room === room;
        });
        var namesArray = users.map((user) => {
           return user.name;
           return namesArray;
        });
    }
}

module.exports = {Users};