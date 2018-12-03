const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

// const newUser = new User({
//     email: 'akhil.kn@pitsolutions.com'
// });

// newUser.save().then((doc) => {
//     console.log('Document saved.');
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.error('Document save failed.', err);
// });

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
})

app.post('/todos', (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Listen to port 3000');
});

module.exports = { app };