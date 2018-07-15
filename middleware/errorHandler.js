const _ = require("lodash");

const logger = require("../helpers/logger")(__filename);

module.exports = () => {
  return (error, req, res, next) => {
    logger.info({ error }, "error caught");

    console.log("error:", error);

    const errors = _.defaults(error, {
      status: 500,
      msg: "Unknown error caught"
    });

    res.status(errors.status).json({
      meta: { link: req.originalUrl },
      errors
    });
  };
};