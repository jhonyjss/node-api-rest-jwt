const bcrypt = require("bcrypt");
const { users } = require("./../../models");

const createUsers = async (req, res, next) => {
  try {
    users.create({ name: req.body.name, email: req.body.email, emailVerified: false, password: bcrypt.hashSync(req.body.password, 12) }).then((item) => {
      res.json({
        "Message": "Created item.",
        "Item": item
      });
      next();
    }).catch(function (err) {
      res.json(err)
    });
  } catch (e) {
    res.json(e.message)
    res.status(500) && next(e)
  }

}

const getAllUsers = async (req, res, next) => {
  try {
    users.findAll({ attributes: ['id', 'name', 'email'] }).then((users) => {
      res.json(users);
      next();
    }).catch(function (err) {
      res.json(err)
    });
  } catch (e) {
    res.json(e.message)
    res.status(500) && next(e)
  }
}

const updateUsers = async (req, res, next) => {
  try {
    users.update({ name: req.body.name }, {
      where: {
        id: req.params.id
      }
    }).then((users) => {
      res.json({ "updated": true, users });
      next();
    }).catch(function (err) {
      res.json(err)
    })
  } catch (e) {
    res.json(e.message)
    res.status(500) && next(e)
  }
}


module.exports = {
  createUsers,
  getAllUsers,
  updateUsers
}