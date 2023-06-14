const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect("mongodb+srv://movie_app_user:admin123@cluster0.zfyrh33.mongodb.net/movie_app", { useNewUrlParser: true });

    mongoose.connection.once('open', () => {
        console.log("Database connected successfully...");
    }).on('error', (err) => {
        console.log(err);
    });

    mongoose.Promise = global.Promise;
}