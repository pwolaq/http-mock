(function () {
    'use strict';

    function httpMock(mappings) {
        var self = this;
        self.mappings = mappings;

        var _open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = open;

        function open() {
            var args = [].slice.call(arguments);

            for (var i = 0; i < self.mappings.length; i++) {
                var mapping = self.mappings[i];

                if (matches(args[1], mapping.pattern)) {
                    return mock.call(this, args, mapping);
                }
            }

            return _open.apply(this, args);
        }

        function mock(args, mapping) {
            if (mapping.file) {
                return redirect.call(this, args, mapping.file);
            } else if (mapping.params) {
                return resolve.call(this, mapping.params);
            } else {
                throw "Invalid mock format";
            }
        }

        function redirect(args, file) {
            args[0] = 'GET';
            args[1] = file;
            return _open.apply(this, args);
        }

        function resolve(params) {
            redefine(this, 'readyState', 4);
            redefine(this, 'status', 200);
            redefine(this, 'send', function () {});

            for (var param in params) {
                redefine(this, param, params[param]);
            }

            if (typeof this.onreadystatechange === 'function') {
                this.onreadystatechange.call(this);
            }
        }

        function redefine(obj, prop, val) {
            Object.defineProperty(obj, prop, {
                value: val
            });
        }

        function matches(url, pattern) {
            return new RegExp(pattern).test(url);
        }
    }

    window.httpMock = httpMock;
})();