const { mongoose } = require('./../db/mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
    user.tokens = user.tokens.concat([{ access, token }]);
    return user.save().then(() => {
        return token;
    });
}

UserSchema.statics.findByToken = function (token) {
    const User = this;
    try {
        const decoded = jwt.verify(token, 'abc123');
        const id = decoded['_id'];
        return User.findOne({
            _id: id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
    } catch (e) {
        return Promise.reject(e);
    }
}

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = { User };