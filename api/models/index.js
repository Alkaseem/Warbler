const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/warbler', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Database connected!!"))
    .catch(err => console.log(`Error: ${err}`));

module.exports.User = require('./user');
module.exports.Message = require('./message');