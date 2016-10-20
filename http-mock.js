(function () {
    "use strict";

    function HttpMock(mappings) {
        var self = this;
        self.mappings = [].slice.call(arguments);

        var _open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = open;

        function open() {
            var args = [].slice.call(arguments);

            for (var i = 0; i < self.mappings.length; i++) {
                var mapping = self.mappings[i];

                if (typeof mapping.pattern !== "undefined") {
                    if (matches(args[1], mapping.pattern)) {
                        return mock.call(this, args, mapping);
                    }
                } else if (typeof mapping.matcher === "function") {
                    if (mapping.matcher.call(this)) {
                        return mock.call(this, args, mapping);
                    }
                } else {
                    throw "Invalid mock format. Please provide pattern or matcher.";
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
                throw "Invalid mock format. Please provide file or params.";
            }
        }

        function redirect(args, file) {
            args[0] = "GET";
            args[1] = file;
            return _open.apply(this, args);
        }

        function resolve(params) {
            redefine(this, "readyState", 4);
            redefine(this, "status", 200);
            redefine(this, "send", function () {});

            for (var param in params) {
                redefine(this, param, params[param]);
            }

            if (typeof this.onreadystatechange === "function") {
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

    window.HttpMock = HttpMock;
})();