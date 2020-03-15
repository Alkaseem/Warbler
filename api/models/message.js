const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

messageSchema.pre('remove', async function (next) {
    try {
        const user = await User.findById(this.creator);
        user.messages.remove(this.id);
        await user.save()
        return next();
    } catch (err) {
        return next(err)
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;