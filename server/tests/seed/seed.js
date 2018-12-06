const jwt = require('jsonwebtoken');

const { ObjectID } = require('mongodb');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: "akhil.kn@gmail.com",
        password: "Pass@123",
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123')
        }]
    },
    {
        _id: userTwoId,
        email: "akhil.kn2@gmail.com",
        password: "Pass@123",
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'abc123')
        }]
    }
];
const todos = [
    {
        _id: new ObjectID(),
        text: "Sample test text"
    },
    {
        _id: new ObjectID(),
        text: "Sample test text2"
    }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all([userOne,userTwo]);
    }).then(() => done());
};

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
}