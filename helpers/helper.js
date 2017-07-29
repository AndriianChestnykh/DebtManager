'use strict';

function getErrorMessage(field) {
    return {
        success: false,
        message: '\'' + field + '\' field is missing or invalid in the request'
    };
}

function parsePositiveInt(str) {
    var n = Math.floor(Number(str));
    return (String(n) === str && n > 0) ? n : 0;
}

module.exports.getErrorMessage = getErrorMessage;
module.exports.parsePositiveInt = parsePositiveInt;