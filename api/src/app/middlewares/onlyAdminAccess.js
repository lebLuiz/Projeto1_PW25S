const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401)
      .json({ error: 'Acesso negado!' });
  }

  try {
    const secret = process.env.SECRET;

    const userDecode = jwt.verify(token, secret);

    if (!userDecode.role || userDecode.role !== 'ADMIN') {
      return res.status(401)
        .json({ error: 'Acesso negado!' });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido!' });
  }
};
