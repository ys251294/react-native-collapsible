"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
function debounce(cb) {
  let wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  let h = 0;
  let callable = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(h);
    // @ts-ignore
    h = setTimeout(() => cb(...args), wait);
  };
  return callable;
}
//# sourceMappingURL=debounce.js.map