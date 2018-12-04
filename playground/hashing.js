console.log("Started");

const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = "Pass@123";

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log({hash});
    })
})

var hashedPassword = "$2a$10$RIQ.wq8.4s5cwZlNuq89JewaXvJRnKOgKNDn/EE.3gsQFi4heuz9m";

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log({res});
})

var data = { id: 1 };

var token = jwt.sign(data, '123abc')
console.log({ token });

var decode = jwt.verify(token, '123abc');
console.log({ decode });