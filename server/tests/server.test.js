const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const todos = [{ _id: new ObjectID(), text: "Sample test text" }, { _id: new ObjectID(), text: "Sample test text2" }];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

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