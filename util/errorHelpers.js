const _ = require("lodash");

module.exports = {
  get401BadTokenError: (options = {}) => {
    return _.assign(
      {
        status: 401,
        code: "EACCESS",
        msg: "Unauthorized access - no valid JWT token found"
      },
      options
    );
  },
  get403ValidationError: (options = {}) => {
    return _.assign(
      {
        status: 403,
        code: "EINVAL",
        msg: "Request validation failed"
      },
      options
    );
  },
  get403Unauthorized: (options = {}) => {
    return _.assign(
      {
        status: 403,
        code: "EACCESS",
        msg: "Invalid credentials"
      },
      options
    );
  },
  get403ResourcNameNotFound: (options = {}) => {
    return _.assign(
      {
        status: 404,
        code: "NOTFOUND",
        msg: "Resource [name] does not exist"
      },
      options
    );
  },
  get404ResourceNotFound: (options = {}) => {
    return _.assign(
      {
        status: 404,
        code: "NOTFOUND",
        msg: "Resource not found"
      },
      options
    );
  },
  get409ResourceExists: (options = {}) => {
    return _.assign(
      {
        status: 409,
        code: "ALEXISTS",
        msg: "Request params correspond to already existing record"
      },
      options
    );
  },
  get500Unknown: (options = {}) => {
    return _.assign(
      {
        status: 500,
        code: "UNKNOWN",
        msg: "Unknown error occurred on the server"
      },
      options
    );
  }
};