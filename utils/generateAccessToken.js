const jwt = require('jsonwebtoken');

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}

module.exports = {
    generateAccessToken
}