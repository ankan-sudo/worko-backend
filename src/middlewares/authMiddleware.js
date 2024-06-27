const basicAuth = require('basic-auth');
const bcrypt = require('bcrypt');

const authMiddleware = (req, res, next) => {
  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    res.status(401).send('Authentication required');
    return;
  }

  if (user.name === 'admin' && bcrypt.compareSync(user.pass, bcrypt.hashSync('adminpass', 10))) {
    next();
  } else {
    res.status(401).send('Invalid credentials');
  }
};

module.exports = authMiddleware;
