const router = require('express').Router({
    mergeParams: true
});
const {
    createMessage,
    getMessage,
    deleteMessage,
    getAllMessage
} = require('../handlers/message');

router.route('/')
    .get(getAllMessage)
    .post(createMessage);

router.route('/:message_id')
    .get(getMessage)
    .delete(deleteMessage)

module.exports = router;