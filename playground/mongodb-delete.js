const { MongoClient, ObjectID } = require('mongodb');
const mongodb_connect = require('./mongodb-connect');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Connection error');
    }
    //deleteMany
    // db.collection('Todos').deleteMany({ name: 'Akhil K' }).then((res) => {
    //     console.log('All documents deleted.',JSON.stringify(res, undefined, 2));
    // }, err => {
    //     console.log('Unable to delete');
    // });
    
    //deleteOne
    // db.collection('Todos').deleteOne({ name: 'Akhil K' }).then((res) => {
    //     console.log('Document deleted.', JSON.stringify(res, undefined, 2));
    // }, err => {
    //     console.log('Unable to delete');
    // });

    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({ name: 'Akhil K' }).then((res) => {
        console.log('Document deleted.', JSON.stringify(res, undefined, 2));
    }, err => {
        console.log('Unable to delete');
    });

    db.close();
})