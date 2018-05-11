const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    it('should add new user', () => {
        var users = new Users()
        var user = {
            id: '123',
            name:'harshit',
            room:'pubg'
        };
        var resUser = users.addUser(user.id , user.name, user.room);
        //tobe for one object
        expect(users.users).toEqual([user]);
    });
});