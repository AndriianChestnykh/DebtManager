'use strict';

function getErrorMessage(field) {
    return {
        success: false,
        message: '\'' + field + '\' field is missing or invalid in the request'
    };
}

module.exports.getErrorMessage = getErrorMessage;