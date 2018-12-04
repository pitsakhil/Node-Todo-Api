console.log("Started");

const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')

// var message= 'Hai, I am Akhil..!!';
// var hash= SHA256(message).toString();

// console.log({hash});


var data = { id: 1 };

var token = jwt.sign(data,'123abc')
// jwt.verify

console.log({ token });

var decode = jwt.verify(token,'123abc');
console.log({decode});