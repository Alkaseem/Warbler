const db = require('../models');

exports.createMessage = async (req, res, next) => {
    try {
        const message = await db.Message.create({
            text: req.body.text,
            creator: req.params.id
        });
        const foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message)
        await foundUser.save();
        const foundMessage = await db.Message.findById(message._id).populate("creator", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
}

exports.getMessage = async (req, res, next) => {
    try {
        const message = await db.Message.findById(req.params.message_id);
        return res.status(200).json(message);
    } catch (err) {
        return next(err)
    }
}

exports.getAllMessage = async (req, res, next) => {
    try {
        const messages = await db.Message.find().sort({
            createdAt: "desc"
        }).populate("creator", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages)
    } catch (err) {
        return next(err);
    }
}

exports.upadateMessage = async (req, res, next) => {

}

exports.deleteMessage = async (req, res, next) => {
    try {
        const foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err)
    }
}