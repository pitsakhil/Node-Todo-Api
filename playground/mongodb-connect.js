const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Connection error');
    }
    console.log('Connected to mongodb');
    db.collection('Todos').insertOne({ _id: obj, name: 'Akhil K', age: 26, location: 'India' }, (err, res) => {
        if (err) {
            return console.log('Insert failed');
        }
        console.log('Document created successfully.', JSON.stringify(res.ops, undefined, 2));
    });
    db.close();
})