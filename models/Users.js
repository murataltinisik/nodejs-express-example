const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        maxLength: [30, "`{PATH}` field, it can {MAXLENGTH} max length!!"],
        minLength: [2, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    surname: {
        type: String,
        maxLength: [30, "`{PATH}` field, it can {MAXLENGTH} max length!!"],
        minLength: [2, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    email: {
        type: String,
        maxLength: [150, "`{PATH}` field, it can {MAXLENGTH} max length!!"],
        minLength: [2, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    password: {
        type: String,
        minLength: [8, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', UsersSchema);