require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const errorHandler = require('./handlers/error');
const authRoute = require('./routes/auth');
const MessageRoute = require('./routes/message');
const AllMessagesRoute = require('./routes/message')
const {
    loginRequired,
    ensureCorrectUser
} = require("./middleware/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/auth', authRoute);
app.use('/api/messages', loginRequired, AllMessagesRoute);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, MessageRoute);

app.get('/', (req, res) => {
    res.json({
        massage: "Wellcome to Warbler app"
    })
});


app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);


app.listen(PORT, () => console.log(`App started @${PORT}`))