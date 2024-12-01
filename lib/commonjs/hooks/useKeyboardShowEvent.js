"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useKeyboardShowEvent;
var _react = require("react");
var _reactNative = require("react-native");
function useKeyboardShowEvent(callback) {
  const savedCallback = (0, _react.useRef)(callback);
  (0, _react.useEffect)(() => {
    savedCallback.current = callback;
  }, [callback]);
  (0, _react.useEffect)(() => {
    const subscription = _reactNative.Keyboard.addListener('keyboardDidShow', () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
}
//# sourceMappingURL=useKeyboardShowEvent.js.map