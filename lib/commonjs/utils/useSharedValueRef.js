"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSharedValueRef;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
function useSharedValueRef(defaultValue) {
  const sharedValue = (0, _reactNativeReanimated.useSharedValue)(defaultValue);
  const savedValue = (0, _react.useRef)(defaultValue);
  const appendValue = (0, _react.useCallback)(value => {
    savedValue.current = {
      ...savedValue.current,
      ...value
    };
    sharedValue.value = savedValue.current;
  }, [sharedValue]);
  return [sharedValue, appendValue];
}
//# sourceMappingURL=useSharedValueRef.js.map