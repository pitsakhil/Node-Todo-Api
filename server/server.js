require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { Todo } = require('./models/todo');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

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

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        const error = 'Not a valid id';
        return res.status(404).send({ error })
    }
    const body = _.pick(req.body, ['text', 'completed'])
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((data) => {
            var message = 'Document updated successfully.';
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