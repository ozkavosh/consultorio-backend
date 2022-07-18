const userParams = (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(403).json({ error: 'Missing email or password' });
    next();
}

const newUserParams = (req, res, next) => {
    const { username, email, password } = req.body;
    if( !username || !email || !password ) return res.status(400).json({ error: 'Missing required params' });
    next();
}

module.exports = {
    userParams,
    newUserParams
}