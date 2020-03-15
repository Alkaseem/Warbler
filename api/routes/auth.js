const router = require('express').Router();
const {
    signUP,
    signIn
} = require('../handlers/auth');

router.post('/signup', signUP)
router.post('/signin', signIn)

module.exports = router;