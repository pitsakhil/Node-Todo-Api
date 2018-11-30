const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Connection error');
    }
    console.log('Connected');

    db.collection('Todos').find({ _id: new ObjectID('5bffe2286a43620d7c2eead6') }).toArray().then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
    }, err => {
        console.log('Unable to fetch');
    });

    db.collection('Todos').find().count().then((res) => {
        console.log(`Count: ${res}`);
    }, err => {
        console.log('Unable to fetch');
    });
    db.close();
})