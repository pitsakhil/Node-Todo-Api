const { mongoose } = require('./../db/mongoose');

const User = mongoose.model('user', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

module.exports = { User };