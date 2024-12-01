"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleHeaderText = CollapsibleHeaderText;
exports.default = CollapsibleView;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

let key = 0;
function CollapsibleView(_ref) {
  let {
    initialState = 'collapsed',
    collapseState = (0, _reactNativeReanimated.useSharedValue)(0),
    renderHeader,
    children,
    containerStyle,
    collapsedBackgroundColor,
    expandedBackgroundColor,
    onToggle
  } = _ref;
  const actualHeight = (0, _reactNativeReanimated.useSharedValue)(11110);
  const contentKey = (0, _react.useMemo)(() => `collapsible-view-${key++}`, []);
  (0, _react.useEffect)(() => {
    const newValue = initialState === 'collapsed' ? 0 : 1;
    if (newValue === collapseState.value) {
      return;
    }
    collapseState.value = newValue;
  }, [initialState]);
  const handleToggle = (0, _react.useCallback)(() => {
    collapseState.value = (0, _reactNativeReanimated.withSpring)(collapseState.value === 0 ? 1 : 0, {
      overshootClamping: true
    });
  }, []);
  const handleLayout = (0, _react.useCallback)(event => {
    if (event.nativeEvent.layout.height >= 0) {
      actualHeight.value = event.nativeEvent.layout.height;
    }
  }, []);
  const wrapperStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    height: (0, _reactNativeReanimated.withSpring)(collapseState.value === 1 ? actualHeight.value : 0, {
      damping: 5,
      stiffness: 130,
      overshootClamping: true
    })
  }), [actualHeight, contentKey]);
  const contentHeight = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    height: actualHeight.value > 0 ? actualHeight.value : undefined
  }), [actualHeight, contentKey]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => collapseState.value === 0 ? 0 : collapseState.value === 1 ? 1 : 0, (result, prev) => {
    if (prev === null || result === prev) {
      return;
    }
    if (onToggle) {
      (0, _reactNativeReanimated.runOnJS)(onToggle)(result === 1);
    }
  });

  // @ts-ignore
  const containerAnimatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    if (collapsedBackgroundColor && expandedBackgroundColor) {
      return {
        backgroundColor: (0, _reactNativeReanimated.interpolateColor)(collapseState.value, [0, 1], [collapsedBackgroundColor, expandedBackgroundColor])
      };
    }
    return {};
  }, []);
  const headerProps = (0, _react.useMemo)(() => ({
    onToggle: handleToggle,
    collapsed: collapseState
  }), [handleToggle, collapseState]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [containerStyle, containerAnimatedStyle],
    pointerEvents: "box-none"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    pointerEvents: "box-none"
  }, renderHeader(headerProps)), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.wrapper, wrapperStyle],
    pointerEvents: "box-none"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.content, contentHeight],
    pointerEvents: "box-none"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: contentKey,
    onLayout: handleLayout,
    pointerEvents: "box-none"
  }, children))));
}
function CollapsibleHeaderText(_ref2) {
  let {
    title,
    collapsed,
    onToggle,
    style,
    titleStyle,
    icon,
    iconInitialAngle = 0,
    children
  } = _ref2;
  const iconStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const rotate = (0, _reactNativeReanimated.interpolate)(collapsed.value, [0, 1], [iconInitialAngle, 180]);
    return {
      transform: [{
        rotate: `${rotate}deg`
      }]
    };
  }, [iconInitialAngle]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style,
    pointerEvents: "box-none"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer,
    pointerEvents: "box-none"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onToggle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.headerTitle, titleStyle]
  }, title)), icon && /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onToggle
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: iconStyle
  }, icon))), children);
}
const styles = _reactNative.StyleSheet.create({
  wrapper: {
    overflow: 'hidden'
  },
  content: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    // flex: 1,
  }
});
//# sourceMappingURL=CollapsibleView.js.map