const { User } = require('./../models/user');

const authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    return User.findByToken(token).then((user) => {
        req.user = user;
        req.token = token;
        next();
    }, (err) => {
        res.status(401).send(err);
    })
}

module.exports = {
    authenticate
}