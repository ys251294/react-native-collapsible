"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollapsibleFlatList;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useAnimatedScroll = _interopRequireDefault(require("./useAnimatedScroll"));
var _useInternalCollapsibleContext = _interopRequireDefault(require("../../hooks/useInternalCollapsibleContext"));
var _AnimatedTopView = _interopRequireDefault(require("../header/AnimatedTopView"));
var _useCollapsibleContext = _interopRequireDefault(require("../../hooks/useCollapsibleContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable react-hooks/exhaustive-deps */
const AnimatedFlatList = _reactNativeReanimated.default.createAnimatedComponent(_reactNative.FlatList);
function CollapsibleFlatList(_ref) {
  let {
    headerSnappable = true,
    ...props
  } = _ref;
  const {
    headerHeight,
    stickyHeaderHeight
  } = (0, _useCollapsibleContext.default)();
  const {
    contentMinHeight,
    scrollViewRef,
    fixedHeaderHeight
  } = (0, _useInternalCollapsibleContext.default)();
  const mounted = (0, _react.useRef)(true);
  const contentHeight = (0, _react.useRef)(0);
  const [internalContentMinHeight, setInternalContentMinHeight] = (0, _react.useState)(contentMinHeight.value);
  const [internalProgressViewOffset, setInternalProgressViewOffset] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  const scrollTo = (0, _react.useCallback)(function (yValue) {
    var _scrollViewRef$curren;
    let animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    (_scrollViewRef$curren = scrollViewRef.current) === null || _scrollViewRef$curren === void 0 ? void 0 : _scrollViewRef$curren.scrollToOffset({
      offset: yValue,
      animated
    });
  }, []);
  const scrollToIndex = (0, _react.useCallback)(params => {
    var _scrollViewRef$curren2;
    (_scrollViewRef$curren2 = scrollViewRef.current) === null || _scrollViewRef$curren2 === void 0 ? void 0 : _scrollViewRef$curren2.scrollToIndex(params);
  }, []);
  const scrollToLocation = (0, _react.useCallback)(() => {
    console.warn('CollapsibleFlatList does not support scrollToLocation');
  }, []);
  const {
    scrollHandler
  } = (0, _useAnimatedScroll.default)({
    headerSnappable,
    scrollTo,
    scrollToIndex,
    scrollToLocation
  });
  const handleInternalContentHeight = (0, _react.useCallback)(value => {
    if (mounted.current) {
      setInternalContentMinHeight(value);
    }
  }, []);
  const handleInternalProgressViewOffset = (0, _react.useCallback)(value => {
    if (mounted.current) {
      setInternalProgressViewOffset(value);
    }
  }, []);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return contentMinHeight.value;
  }, (result, previous) => {
    if (result !== previous) {
      if (contentHeight.current < result && internalContentMinHeight !== result) {
        (0, _reactNativeReanimated.runOnJS)(handleInternalContentHeight)(result);
      }
    }
  });
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return fixedHeaderHeight.value;
  }, (result, previous) => {
    if (result !== previous) {
      (0, _reactNativeReanimated.runOnJS)(handleInternalProgressViewOffset)(result);
    }
  });
  const contentContainerStyle = (0, _react.useMemo)(() => {
    var _props$contentContain;
    return [styles.contentContainer, props.contentContainerStyle, {
      minHeight: internalContentMinHeight,
      paddingTop: stickyHeaderHeight.value + +(((_props$contentContain = props.contentContainerStyle) === null || _props$contentContain === void 0 ? void 0 : _props$contentContain.paddingTop) || 0)
    }];
  }, [props.contentContainerStyle, internalContentMinHeight, stickyHeaderHeight]);
  const handleContentSizeChange = (0, _react.useCallback)((_, height) => {
    contentHeight.current = height;
  }, []);
  const handleScrollToIndexFailed = (0, _react.useCallback)(() => {}, []);
  const topBarHeight = (0, _reactNativeReanimated.useDerivedValue)(() => headerHeight.value - stickyHeaderHeight.value, [headerHeight, stickyHeaderHeight]);
  function renderListHeader() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_AnimatedTopView.default, {
      height: topBarHeight
    }), props.ListHeaderComponent);
  }
  return /*#__PURE__*/_react.default.createElement(AnimatedFlatList, _extends({
    ref: scrollViewRef,
    keyboardDismissMode: "on-drag",
    keyboardShouldPersistTaps: "handled",
    scrollEventThrottle: 1,
    onScrollToIndexFailed: handleScrollToIndexFailed
  }, props, {
    style: [styles.container, props.style],
    contentContainerStyle: contentContainerStyle,
    onScroll: scrollHandler,
    ListHeaderComponent: renderListHeader(),
    onContentSizeChange: handleContentSizeChange
    //@ts-ignore
    ,
    simultaneousHandlers: [],
    progressViewOffset: internalProgressViewOffset
  }));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    ..._reactNative.StyleSheet.absoluteFillObject
  },
  contentContainer: {
    flexGrow: 1
  },
  topView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});
//# sourceMappingURL=CollapsibleFlatList.js.map