const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null || !token) return res.status(401).json({ error: 'You must be logged in' });
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ error: 'Invalid token' });
  
      req.user = user
  
      next()
    })
}

module.exports = {
    authenticateToken
}