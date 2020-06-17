const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { users } = require("./../../models");

const userLogin = async (req, res, next) => {
  try {
    let response = await users.findAll({
      where: {
        email: req.body.email,
      },
      raw: true,
    })
    let user = response[0];
    if (bcrypt.compareSync(req.body.password, response[0].password)) {
      const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: 3600 // expires in 60min
      });

      res.json({ auth: true, token: token, ...user });
      next();
    }
  } catch (error) {
    res.status(500).json({ "message": "Login inválido" }) && next(error);
  }
}

const logout = async (req, res, next) => {
  res.json({ auth: false, token: null });
}


const verifyJWT = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(token)
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.user;
    next();
  });
}

module.exports = {
  userLogin,
  logout,
  verifyJWT
}