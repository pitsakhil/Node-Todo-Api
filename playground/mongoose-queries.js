const { mongoose } = require('mongoose');
const { Todo } = require('./../server/models/todo');

Todo.find({ _id: '5c04e94cc92b18781520247e' }).then((todos) => {
    console.log(JSON.stringify(todos, undefined, 2));
});

Todo.findById('5c04e94cc92b18781520247e').then((todo) => {
    console.log(JSON.stringify(todo, undefined, 2));
},(e)=>{
    console.log(e);
})