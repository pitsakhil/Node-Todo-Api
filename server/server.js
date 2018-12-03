const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const port = process.env.PORT || 3000;
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

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        const error = 'Not a valid id';
        return res.status(404).send({ error })
    }
    Todo.findById(id).then((todo) => {
        if (todo) {
            res.status(200).send({ todo });
        } else {
            res.status(404).send('Id not found');
        }
    }, (err) => {
        res.status(400).send({ err });
    });
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        const error = 'Not a valid id';
        return res.status(404).send({ error })
    }
    Todo.findByIdAndRemove(id).then((data) => {
        var message = 'Document deleted successfully.';
        if (data) {
            return res.status(200).send({ message, data });
        }
        res.status(404).send({ message: 'Document not found' });
    }, (err) => {
        res.status(400).send({ err });
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

app.listen(port, () => {
    console.log('Listen to port 3000');
});

module.exports = { app };