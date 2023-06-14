const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: [120, "`{PATH}` field, it can {MAXLENGTH} max length!!"],
        minLength: [12, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    content: {
        type: String,
        required: true,
        maxLength: [1000, "`{PATH}` field, it can {MAXLENGTH} max length!!"],
        minLength: [1, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    image: {
        type: String,
        required: true,
        maxLength: [1000, "`{PATH}` field, it can {MAXLENGTH} max length!!"],
        minLength: [1, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    tag: {
        type: String,
        required: true,
        maxLength: [20, "`{PATH}` field, it can {MAXLENGTH} max length!!"],
        minLength: [2, "`{PATH}` field, it can {MINLENGTH} min length!!"],
    },
    user_id: Schema.Types.ObjectId,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('news', NewsSchema)