const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Connection error');
    }
    console.log('Connected');

    db.collection('Todos')
        .findOneAndUpdate(
            { _id: new ObjectID("5c00dc1961543813d4e6611f") },
            { $set: { name: 'Akhil K' }, $inc: { age: 1 } },
            { returnOriginal: false }
        )
        .then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
        });

    db.close();
})