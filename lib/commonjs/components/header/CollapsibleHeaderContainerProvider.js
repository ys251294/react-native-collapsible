"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollapsibleHeaderContainerProvider;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useInternalCollapsibleContext = _interopRequireDefault(require("../../hooks/useInternalCollapsibleContext"));
var _useCollapsibleContext = _interopRequireDefault(require("../../hooks/useCollapsibleContext"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useCollapsibleHeaderContext = require("../../hooks/useCollapsibleHeaderContext");
var _useSharedValueRef = _interopRequireDefault(require("../../utils/useSharedValueRef"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function CollapsibleHeaderContainerProvider(_ref) {
  let {
    children,
    containerStyle,
    contentKey
  } = _ref;
  const {
    handleHeaderContainerLayout,
    headerViewPositions
  } = (0, _useInternalCollapsibleContext.default)();
  const {
    scrollY
  } = (0, _useCollapsibleContext.default)();
  const currentLayout = (0, _reactNativeReanimated.useSharedValue)(undefined);
  const [stickyLayouts, setStickyLayouts] = (0, _useSharedValueRef.default)({});
  (0, _react.useEffect)(() => {
    return () => {
      handleHeaderContainerLayout(contentKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);
  const stickyHeight = (0, _reactNativeReanimated.useDerivedValue)(() => Object.values(stickyLayouts.value).reduce((acc, value) => acc + ((value === null || value === void 0 ? void 0 : value.height) ?? 0), 0), []);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    if (!currentLayout.value) {
      return -1;
    }
    return currentLayout.value.height - currentLayout.value.y - stickyHeight.value;
  }, (result, previous) => {
    if (result !== -1 && result !== previous) {
      (0, _reactNativeReanimated.runOnJS)(handleHeaderContainerLayout)(contentKey, currentLayout.value, stickyHeight.value);
    }
  });
  const handleLayout = (0, _react.useCallback)(_ref2 => {
    let {
      nativeEvent: {
        layout
      }
    } = _ref2;
    currentLayout.value = layout;
  }, [currentLayout]);
  const handleStickyViewLayout = (0, _react.useCallback)((stickyKey, layout) => {
    setStickyLayouts({
      [stickyKey]: layout
    });
  }, [setStickyLayouts]);
  const translateY = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const position = headerViewPositions.value[contentKey];
    if (!currentLayout.value || !position) {
      return 0;
    }
    const topPosition = currentLayout.value.height + currentLayout.value.y - position.top - position.stickyHeight;
    return (0, _reactNativeReanimated.interpolate)(scrollY.value, [0, topPosition, 10000], [0, -topPosition, -topPosition], _reactNativeReanimated.Extrapolate.CLAMP);
  });
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: translateY.value
      }]
    };
  });
  const animatedY = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const position = headerViewPositions.value[contentKey];
    if (!currentLayout.value || !position) {
      return 0;
    }
    const value = scrollY.value - currentLayout.value.y + position.top;
    const maxV = currentLayout.value.height - stickyHeight.value;
    return Math.max(0, Math.min(value, maxV));
  });
  const value = (0, _react.useMemo)(() => ({
    handleStickyViewLayout,
    animatedY
  }), [handleStickyViewLayout, animatedY]);
  return /*#__PURE__*/_react.default.createElement(_useCollapsibleHeaderContext.CollapsibleHeaderContext.Provider, {
    value: value
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    key: contentKey,
    style: [styles.container, containerStyle, animatedStyle],
    pointerEvents: "box-none",
    onLayout: handleLayout
  }, children));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white'
  }
});
//# sourceMappingURL=CollapsibleHeaderContainerProvider.js.map