"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StickyView;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useCollapsibleHeaderContext = _interopRequireDefault(require("../../hooks/useCollapsibleHeaderContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable react-hooks/exhaustive-deps */

let stickyKey = 0;
function StickyView(_ref) {
  let {
    children,
    style,
    stickyRef
  } = _ref;
  const key = (0, _react.useMemo)(() => `sticky_${stickyKey++}`, []);
  const {
    handleStickyViewLayout,
    animatedY
  } = (0, _useCollapsibleHeaderContext.default)();
  const currentLayout = (0, _reactNativeReanimated.useSharedValue)(undefined);
  (0, _react.useEffect)(() => {
    return () => handleStickyViewLayout(key, undefined);
  }, [key]);
  const handleLayout = (0, _react.useCallback)(_ref2 => {
    let {
      nativeEvent: {
        layout
      }
    } = _ref2;
    currentLayout.value = layout;
    handleStickyViewLayout(key, layout);
  }, [key, handleStickyViewLayout]);
  const translateY = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (!currentLayout.value) {
      return 0;
    }
    const {
      height: stickyHeight,
      y: top
    } = currentLayout.value;
    const topValue = top;
    return (0, _reactNativeReanimated.interpolate)(animatedY.value, [0, topValue, topValue + stickyHeight + 100000], [0, 0, stickyHeight + 100000], _reactNativeReanimated.Extrapolate.CLAMP);
  }, []);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: translateY.value
      }]
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    key: key
    // @ts-ignore
    ,
    ref: stickyRef,
    onLayout: handleLayout,
    style: [styles.container, style, animatedStyle],
    pointerEvents: "box-none"
  }, children);
}
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: 'white',
    zIndex: 10
  }
});
//# sourceMappingURL=StickyView.js.map