const _ = require("lodash");

exports.get401BadTokenError = function (options = {}) {
    return _.assign(
        {
            status: 401,
            code: "EACCESS",
            detail: "Unauthorized access - no valid JWT token found"
        },
        options
    );
}

exports.get403ValidationError = function (options = {}) {
    return _.assign(
        {
            status: 403,
            code: "EINVAL",
            detail: "Request validation failed"
        },
        options
    );
}

exports.get403Unauthorized = function (options = {}) {
    return _.assign(
        {
            status: 403,
            code: "EACCESS",
            detail: "Invalid credentials"
        },
        options
    );
}

exports.get403ResourcNameNotFound = function (options = {}) {
    return _.assign(
        {
            status: 404,
            code: "NOTFOUND",
            detail: "Resource [name] does not exist"
        },
        options
    );
}

exports.get404ResourceNotFound = function (options = {}) {
    return _.assign(
        {
            status: '404',
            code: 'ENOTFOUND',
            title: 'Requested resource does not exist',
            detail: `There are no ${options.type} with id ${options.id}`
        },
        options
    );
}

exports.get409ResourceExists = function (options = {}) {
    return _.assign(
        {
            status: 409,
            code: "ALEXISTS",
            detail: "Request params correspond to already existing record"
        },
        options
    );
}

exports.get500Unknown = function (options = {}) {
    return _.assign(
        {
            status: 500,
            code: "UNKNOWN",
            detail: "Unknown error occurred on the server"
        },
        options
    );
}
