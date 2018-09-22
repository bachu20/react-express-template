module.exports = (sequelize = {}) => {
  return (req, res, next) => {
    req.sequelize = sequelize;
    next();
  };
}
