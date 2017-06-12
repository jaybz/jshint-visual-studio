'use strict';

module.exports = {
    reporter: function(results) {
        // Categorise each error by filename.
        var errors = results.reduce(function(previous, current) {
            if (!previous[current.file]) {
                previous[current.file] = [];
            }

            var error = current.error;
            var errorCode = error.code;
            var severity = '';

            switch (errorCode[0]) {
                case 'I':
                    severity = 'info';
                    break;
                case 'W':
                    severity = 'warning';
                    break;
                case 'E':
                    severity = 'error';
                    break;
            }

            previous[current.file].push(current.file + '(' + error.line + ',' +
            error.character + ')' + ': ' + severity + ': JSHint: ' +
            error.reason);

            return previous;
        }, {});

        if (Object.keys(errors).length > 0) {
            console.log('');

            Object.keys(errors).forEach(function(key) {
                    errors[key].forEach(function(error) {
                        console.log(error);
                    });
                });

            console.log('');
        }
    }
};
