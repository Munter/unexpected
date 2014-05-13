/*global namespace, window*/
(function () {
    var chalk;
    if (typeof window === 'undefined' && typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        chalk = require('chalk');
        namespace.format = function (formats, text) {
            return formats.split(' ').reduce(function (chalk, format) {
                return chalk[format];
            }, chalk)(text);
        };
    } else {
        namespace.format = function (formats, text) {
            return text;
        };
    }
}());
