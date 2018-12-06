const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, users, populateTodos, populateUsers } = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = "Sample test text";
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should notcreate new todo', (done) => {
        request(app)
            .post('/todos')
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should return todos', (done) => {
        var text = "Sample test text";
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });

});

describe('GET /todos/:id', () => {
    it('should return todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]['_id'].toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete todo by id', (done) => {
        const id = todos[0]['_id'].toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.data._id).toBe(id);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if objectid is invalid', (done) => {
        const id = 1234;
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('UPDATE /todos/:id', () => {
    it('should update todo by id', (done) => {
        const id = todos[0]['_id'].toHexString();
        const text = "Update Text";
        request(app)
            .put(`/todos/${id}`)
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.text).toBe(text);
            })
            .end(done);
    });

    it('should return 404 if objectid is invalid', (done) => {
        const id = 1234;
        request(app)
            .put(`/todos/${id}`)
            .expect(404)
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create new user', (done) => {
        const email = 'akhi@gmail.com';
        const password = 'Pass@123';
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
                expect(res.header['x-auth']).toExist();
                expect(res.body._id).toExist();
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                User.find({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should notcreate new user', (done) => {
        request(app)
            .post('/users')
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                User.find().then((users) => {
                    expect(users.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if unauthenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', 'abc' + users[0].tokens[0].token)
            .expect(401)
            .end(done);
    });

});