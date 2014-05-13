/*global namespace, window*/
(function () {
    var aliases = {
        comment: 'grey',
        error: 'red'
    };

    function formatStringToArray(formatString) {
        var result = [];
        formatString.split(' ').forEach(function (format) {
            if (format in aliases) {
                formatStringToArray(aliases[format]).forEach(function (format) {
                    result.push(format);
                });
            } else {
                result.push(format);
            }
        });
        return result;
    }

    var chalk;
    if (typeof window === 'undefined' && typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        chalk = require('chalk');

        namespace.format = function (formatString, text) {
            return formatStringToArray(formatString).reduce(function (formats, format) {
                return chalk[format];
            }, chalk)(text);
        };
    } else {
        namespace.format = function (formats, text) {
            return text;
        };
    }
}());
