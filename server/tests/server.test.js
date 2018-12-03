const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const Todos = [{ text: "Sample test text" }, { text: "Sample test text2" }];
beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(Todos).then(() => done());
    });
})
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
    })
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
            .end(done());
    });

})