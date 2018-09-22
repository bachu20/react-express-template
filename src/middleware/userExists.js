const _ = require("lodash");
const Promise = require('bluebird');

const { errorHelpers } = require('../util/index');

module.exports = () => {
  return (req, res, next) => Promise.resolve()
    .then(() => req.sequelize.models.user)
    .then(User => User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }))
    .tap(foundUser => foundUser ? foundUser : Promise.reject(errorHelpers.get403Unauthorized()))
    .then(foundUser => res.json(foundUser))
    .catch(err => next(err))
};