const jwt = require('jsonwebtoken');

//Make sure the user is logged in - Authentications
exports.loginRequired = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please login first"
                })
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: "Please login first"
        })
    }
}


//Make sure we got the correct user - Authentications
exports.ensureCorrectUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "UnAthorized"
                })
            }
        })
    } catch (err) {
        return next({
            status: 401,
            message: "UnAthorized"
        })
    }
}